import { Text } from "react-native";
import { React, useContext } from "react";
import { SettingsContext } from "./appContext";

export default function ColoredText({ text, customStyle }) {
  const [currency, setCurrency, appColor, setAppColor] =
    useContext(SettingsContext);
  return (
    <Text className={customStyle} style={{ color: appColor.hex }}>
      {text}
    </Text>
  );
}
