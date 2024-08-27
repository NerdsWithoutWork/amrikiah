import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useContext } from "react";

import { SettingsContext } from "../components/appContext";

const CustomButton = ({
  title,
  handlePress,
  containeyStyles,
  isLoading,
  isDisabled,
  textStyles,
}) => {
  const [currency, setCurrency, appColor, setAppColor] =
    useContext(SettingsContext);
  return (
    <TouchableOpacity
      className={` justify-center items-center px-16 py-4 rounded-3xl ${containeyStyles}`}
      onPress={isDisabled ? undefined : handlePress}
      activeOpacity={isDisabled ? 1 : 0.4}
      style={{ backgroundColor: isDisabled ? "#2e2e2e" : appColor.hex }}
    >
      <Text className={`text-center font-semibold text-Tertiary ${textStyles}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
