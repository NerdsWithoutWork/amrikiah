import { View, Text, Image } from "react-native";
import { React, useContext } from "react";
import { Tabs } from "expo-router";
import icons from "../../constants/icons";
import { SettingsContext } from "../../components/appContext";
const TabIcon = ({ icon, color, name, focused }) => {
  const [currency, setCurrency, appColor, setAppColor] =
    useContext(SettingsContext);

  return (
    <View className="items-center justify-center">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={focused ? appColor.hex : "#808080"}
        className="w-6 h-6"
      />
      <Text
        className={`${focused ? "" : "hidden"} capitalize`}
        style={{ color: appColor.hex }}
      >
        {name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  const [currency, setCurrency, appColor, setAppColor] =
    useContext(SettingsContext);
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#1F1D1D",
            borderBlockColor:"white",
            height: 84,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Order",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.bill}
                color={color}
                name="Order"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="restaurant"
          options={{
            title: "restaurant",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.restaurant}
                color={color}
                name="Restaurnat"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="members"
          options={{
            title: "Members",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.users}
                color={color}
                name="Members"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: "Settings",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.settings}
                color={color}
                name="Settings"
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;
