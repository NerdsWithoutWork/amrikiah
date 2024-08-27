import { React, useState, useEffect, useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";
import { Stack } from "expo-router";
import { DBContext, OrderContext } from "../components/appContext";
import { getLastOrderId, getOrderRestaurantId } from "../lib/orders";
import { SettingsContext } from "../components/appContext";
import { getAllMembers } from "../lib/members";
import { getAllRestaurants } from "../lib/restaurants";

import currencies from "../constants/currencies";
import colors from "../constants/colors";
import { getAllMeals } from "../lib/meals";
import { initializeDatabase } from "../lib/database";
import { getSettings, initSettings } from "../lib/settings";

const RootLayout = () => {
  const [dbUpdate, setDbUpdate] = useState(true);
  const [orderId, setOrderId] = useState();
  const [restaurantId, setRestaurantId] = useState();
  const [currency, setCurrency] = useState(currencies[0]);
  const [appColor, setAppColor] = useState(colors[0]);

  const [globalMembers, setGlobalMembers] = useState([]);
  const [globalRestaurants, setGlobalRestaurants] = useState([]);
  const [globalMeals, setGlobalMeals] = useState([]);

  const [appIsReady, setAppIsReady] = useState(false);

  const initializeGlobalData = async () => {
    setGlobalMembers(await getAllMembers());
    setGlobalRestaurants(await getAllRestaurants());
    if (restaurantId) {
      setGlobalMeals(await getAllMeals(restaurantId));
    }
    const settings = await getSettings();
    setAppColor(colors[settings.AccentColor]);
    setCurrency(currencies[settings.Currency]);
  };

  useEffect(() => {
    async function prepare() {
      try {
        await initializeDatabase();
        await initSettings();
        await initializeGlobalData();
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    if (!orderId && appIsReady) {
      getLastOrderId().then((id) => {
        if (!id) return;
        setOrderId(id);
        getOrderRestaurantId(id).then(setRestaurantId);
      });
    }
  }, [orderId, appIsReady]);

  function toggleDB() {
    setDbUpdate((dbUpdate) => !dbUpdate);
  }

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  const createOrder = async (restId) => {
    const lastOrderId = await getLastOrderId();
    setOrderId(lastOrderId + 1);
    setRestaurantId(restId);
    setGlobalMeals(await getAllMeals(restId));
    return lastOrderId + 1;
  };

  const SelectOrder = async (oId) => {
    setOrderId(oId);
    restId = await getOrderRestaurantId(oId);
    setRestaurantId(restId);
    setGlobalMeals(await getAllMeals(restId));
  };

  return (
    <DBContext.Provider
      value={{
        globalMembers,
        setGlobalMembers,
        globalRestaurants,
        setGlobalRestaurants,
        globalMeals,
        setGlobalMeals,
      }}
    >
      <SettingsContext.Provider
        value={[currency, setCurrency, appColor, setAppColor]}
      >
        <OrderContext.Provider
          value={{
            dbUpdate,
            toggleDB,
            createOrder,
            orderId,
            restaurantId,
            SelectOrder,
          }}
        >
          <Stack onLayout={onLayoutRootView}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="(restaurant)"
              options={{ headerShown: false }}
            />
          </Stack>
        </OrderContext.Provider>
      </SettingsContext.Provider>
    </DBContext.Provider>
  );
};

export default RootLayout;
