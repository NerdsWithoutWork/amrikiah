import { Image } from "react-native";
import { React, useContext } from "react";
import { SettingsContext } from "./appContext";

export default function ColoredIcon({ iconName, customStyle, resizeMode }) {
  const [currency, setCurrency, appColor, setAppColor] =
    useContext(SettingsContext);
  return (
    <Image
      className={customStyle}
      source={iconName}
      tintColor={appColor.hex}
      resizeMode={resizeMode}
    />
  );
}
