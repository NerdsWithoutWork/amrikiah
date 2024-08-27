import React, { useContext } from "react";
import { Text } from "react-native";
import { SettingsContext } from "./appContext";
import ColoredText from "./ColoredText";

export default function PriceTag({ price, customStyles, colored }) {
  const [currency, setCurrency, appColor, setAppColor] =
    useContext(SettingsContext);

  return colored ? (
    <ColoredText
      text={price + " " + currency.symbol}
      customStyle={customStyles}
    />
  ) : (
    <Text className={customStyles}>{price + " " + currency.symbol}</Text>
  );
}
