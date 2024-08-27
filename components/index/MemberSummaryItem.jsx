import { View, Text } from "react-native";
import { React, useContext } from "react";
import { SettingsContext } from "../appContext";
import PriceTag from "../PriceTag";

const MemberSummaryItem = ({
  itemName,
  itemCount,
  totalItemsPrice,
  hidden,
}) => {
  return (
    <View
      className={`flex flex-row justify-between items-center border-b-[1px] py-1 border-Tertiary/20 ${
        hidden ? "hidden" : ""
      }`}
    >
      <View className="w-1/3">
        <Text className="text-Tertiary">{itemName}</Text>
      </View>
      {itemCount > 0 && (
        <View className="w-1/3">
          <Text className="text-Tertiary">
            {itemCount}
            {""}
            {itemCount > 1 ? " items" : " item"}
          </Text>
        </View>
      )}
      <View className="w-1/3 items-end">
        <PriceTag
          price={Number(totalItemsPrice.toFixed()).toLocaleString()}
          customStyles={"font-bold text-Tertiary"}
          colored={false}
        />
      </View>
    </View>
  );
};

export default MemberSummaryItem;
