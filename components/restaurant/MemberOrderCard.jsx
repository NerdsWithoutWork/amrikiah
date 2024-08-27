import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useState } from "react";

const MemberOrderCard = ({
  memberId,
  memberName,
  mealCount,
  updateMealCount,
}) => {
  return (
    <View className="flex flex-row justify-between items-center py-4 mx-6 ">
      <Text className="text-Tertiary text-lg">{memberName}</Text>
      <View className="flex flex-row items-center justify-end w-1/2 gap-2">
        <TouchableOpacity
          className={
            mealCount === 0
              ? "border-2 border-Tertiary rounded-full w-9 h-9 items-center text-lg opacity-80"
              : `border-2 border-Tertiary rounded-full w-9 h-9 items-center text-lg opacity-80`
          }
          style={mealCount === 0 ? { opacity: 0.5 } : null}
          onPress={
            mealCount === 0
              ? undefined
              : () => updateMealCount(memberId, mealCount - 1)
          }
        >
          <Text className="text-Tertiary text-lg">-</Text>
        </TouchableOpacity>
        <Text className="text-Tertiary text-lg"> {mealCount} </Text>
        <TouchableOpacity
          className="border-2 border-Tertiary rounded-full w-9 h-9 items-center text-lg opacity-80"
          onPress={() => updateMealCount(memberId, mealCount + 1)}
        >
          <Text className="text-Tertiary text-lg">+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MemberOrderCard;
