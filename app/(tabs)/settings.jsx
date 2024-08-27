import { View, Text } from "react-native";
import { React, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import CustomButton from "../../components/CustomButton.jsx";
import {
  getAllOrders,
  deleteAllOrders,
  getMemberOrderSummary,
} from "../../lib/orders";
import { resetDatabase } from "../../lib/database";
import { SettingsContext } from "../../components/appContext";
import currencyData from "../../constants/currencies.js";
import ColorPicker from "../../components/settings/ColorPicker.jsx";
import colorData from "../../constants/colors.js";
import CurrencyPicker from "../../components/settings/CurrencyPicker";

const Settings = () => {
  const resetDB = async () => {
    try {
      await resetDatabase();
    } catch (error) {
      console.error("Error resetting database:", error);
      throw error;
    }
  };

  const [currency, setCurrency, appColor, setAppColor] =
    useContext(SettingsContext);

  return (
    <SafeAreaView className="bg-Primary h-full px-3">
	  {/*<View className="my-3 flex flex-col space-y-3">
        <CustomButton
          title={"RESET DATABASE"}
          handlePress={() => resetDB()}
          containeyStyles={"my-2 bg-red-600"}
        />
        <CustomButton
          title={"DELETE ORDERS"}
          handlePress={() => deleteAllOrders()}
          containeyStyles={"my-2 bg-red-400"}
        />
        <CustomButton
          title={"VIEW ALICE ORDER SUMMARY"}
          handlePress={() => getMemberOrderSummary(1, 3).then(console.log)}
          containeyStyles={"my-2 bg-green-400"}
        />
        <CustomButton
          title={"VIEW ORDERS"}
          handlePress={() => getAllOrders(1).then(console.log)}
          containeyStyles={"my-2 bg-green-600"}
        />
      </View>
*/}
      <View className="my-3 flex flex-col space-y-3 justify-center items-center">
        <Text className="text-Tertiary text-center text-2xl font-semibold my-5">Settings</Text>
        <CurrencyPicker
          title={"Currency"}
          data={currencyData}
          option={currency}
          setOption={setCurrency}
        />
        <ColorPicker
          key={colorData.map((color) => color.id)}
          title={"App Accent Color"}
          data={colorData}
          option={appColor}
          setOption={setAppColor}
        />
      </View>

      <StatusBar style="light" />
    </SafeAreaView>
  );
};

export default Settings;
