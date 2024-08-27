import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { React, useState } from "react";
import icons from "../../constants/icons";
import ColoredIcon from "../ColoredIcon";
import { updateAccentColor } from "../../lib/settings";

export default function ColorPicker({ title, data, option, setOption }) {
  const [open, setOpen] = useState(false);

  const compareColors = (a, b) => {
    return a.id === b.id;
  };

  const ColorTag = ({ color }) => {
    const isSelected = compareColors(option, color);
    const selectColor = () => {
      updateAccentColor(color.id);
      setOption(color);
    };
    return (
      <TouchableOpacity
        className={`flex flex-row items-center space-x-2 rounded-lg px-4 py-2 m-1 ${
          isSelected ? "bg-Agrey-300" : "bg-transparent border border-Agrey-200 "
        }`}
        onPress={() => selectColor(color)}
      >
        <View
          style={{ backgroundColor: color.hex }}
          className="p-3 rounded-full"
        ></View>
        <Text className="text-Tertiary">{color.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View className="flex flex-col w-full justify-between py-4 space-y-2">
      <View className="flex flex-row justify-between items-center">
        <Text className="text-Tertiary text-lg">{title}</Text>
        <View className="flex flex-row items-center space-x-6">
          <View
            style={{ backgroundColor: option.hex }}
            className="p-3 rounded-full"
          ></View>
          <TouchableOpacity onPress={() => setOpen(!open)}>
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
          renderItem={({ item }) => <ColorTag color={item} />}
          keyExtractor={(item) => item.id}
          numColumns={3}
          display="flex"
          flexDirection="row"
        />
      )}
    </View>
  );
}
