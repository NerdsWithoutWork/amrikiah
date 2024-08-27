import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { React, useState } from "react";
import icons from "../../constants/icons";
import ColoredIcon from "../ColoredIcon";
import { updateCurrency } from "../../lib/settings";

export default function CurrencyPicker({ title, data, option, setOption }) {
  const [open, setOpen] = useState(false);

  const compareCurrencies = (a, b) => {
    return a.code === b.code;
  };

  const selectCurrency = (currency) => {
    updateCurrency(currency.id);
    setOption(currency);
  };

  const CurrencyTag = ({ currency }) => {
    const isSelected = compareCurrencies(option, currency);

    return (
      <TouchableOpacity
        className={`items-center  px-4 py-2 m-1 rounded-lg ${
          isSelected ? "bg-Agrey-300" : "bg-transparent border-Agrey-200 border"
        }`}
        onPress={() => selectCurrency(currency)}
      >
        <Text className="text-Tertiary">{currency.code}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View className="flex flex-col w-full justify-between py-4 space-y-2">
      <View className="flex flex-row justify-between items-center">
        <Text className="text-Tertiary text-lg">{title}</Text>
        <View className="flex flex-row items-center space-x-6">
          <Text className="text-Tertiary">{option.code}</Text>
          <TouchableOpacity
            onPress={() => {
              setOpen(!open);
            }}
          >
            <ColoredIcon
              iconName={icons.arrow_down}
              customStyle={`w-5 h-5 ${open ? "rotate-180" : ""}`}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
      {open && (
        <FlatList
          data={data}
          renderItem={({ item }) => <CurrencyTag currency={item} />}
          keyExtractor={(item) => item.id}
          className=""
          numColumns={4}
          display="flex"
          flexDirection="row"
        />
      )}
    </View>
  );
}
