import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { React, useState } from "react";

export default function DropdownSelect({ title, data, option, setOption }) {
  const [viewDropdown, setViewDropdown] = useState(false);
  return (
    <View className="flex flex-row w-full justify-between py-4">
      <Text className="text-Tertiary text-lg">{title}</Text>
      <TouchableOpacity
        className="bg-Agrey-200 p-2 rounded-lg w-44 items-center"
        onPress={() => setViewDropdown(!viewDropdown)}
      >
        <Text className="text-Tertiary text-lg">{option.name}</Text>
        {viewDropdown && (
          <ScrollView className="h-32 w-full overflow-scroll">
            {data.map((item) => (
              <TouchableOpacity
                key={item.id}
                className={`${
                  option === item.name ? "bg-Secondary" : "bg-Agrey-200"
                } p-2 rounded-lg `}
                onPress={() => {
                  setOption(item);
                  setViewDropdown(!viewDropdown);
                }}
              >
                <Text className="text-Tertiary text-lg">{item.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </TouchableOpacity>
    </View>
  );
}
