import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import { React, useState, useContext } from "react";
import icons from "../../constants/icons";
import MemberSummaryItem from "./MemberSummaryItem";
import { SettingsContext } from "../../components/appContext";
import ColoredText from "../ColoredText";
import ColoredIcon from "../ColoredIcon";
import PriceTag from "../PriceTag";
const MemberPaymentSummary = ({
  memberName,
  total,
  memberItems,
  indivisualTax_Delivery,
}) => {
  const [expand, setExpand] = useState(false);
  const [currency] = useContext(SettingsContext);
  return (
    <TouchableOpacity
      className=" w-[90vw] rounded-2xl p-4 bg-Agrey-100 my-2"
      onPress={() => setExpand(!expand)}
      activeOpacity={0.8}
    >
      <View className="flex flex-row items-center justify-between ">
        <Text className="text-Tertiary font-semibold text-xl">
          {memberName}
        </Text>
        <View className="flex flex-row items-center">
          <PriceTag
            price={Number(total.toFixed()).toLocaleString()}
            customStyles={"text-lg font-semibold mr-2"}
            colored={true}
          />
          <ColoredIcon
            iconName={icons.arrow_down}
            customStyle={`w-5 h-5 ${expand ? "rotate-180 tr" : ""}`}
            resizeMode={"contain"}
          />
        </View>
      </View>

      <View className={expand ? "mt-4 " : "hidden"}>
        <FlatList
          data={memberItems}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <MemberSummaryItem
              key={item.id}
              itemName={item.MealName}
              itemCount={item.MealCount}
              totalItemsPrice={item.MealPrice * item.MealCount}
            />
          )}
        />

        {
          <MemberSummaryItem
            itemName={"Delivery"}
            totalItemsPrice={indivisualTax_Delivery.delivery}
            hidden={indivisualTax_Delivery.delivery === 0}
          />
        }
        {
          <MemberSummaryItem
            itemName={"Tax"}
            totalItemsPrice={indivisualTax_Delivery.tax}
            hidden={indivisualTax_Delivery.tax === 0}
          />
        }
      </View>
    </TouchableOpacity>
  );
};

export default MemberPaymentSummary;
