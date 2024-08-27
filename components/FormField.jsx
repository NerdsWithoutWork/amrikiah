import { View, Text, TextInput } from "react-native";
import { SettingsContext } from "../components/appContext";
import React, { useContext } from "react";

const FormField = ({ title, value, handleChangeText, keyboardType }) => {
  const [currency, setCurrency, appColor, setAppColor] = useContext(SettingsContext)
  return (
    <View className="space-y-1 my-3">
      <Text className="text-Tertiary font-medium">{title}</Text>
      <View className="bg-Tertiary w-full p-1 rounded-lg focus:border-2" style={{borderColor: appColor.hex}}>
        <TextInput value={value} onChangeText={handleChangeText} keyboardType={keyboardType} className="text-black h-10" />
      </View>
    </View>
  );
};

export default FormField;