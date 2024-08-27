import { View, Text, TextInput, KeyboardAvoidingView } from "react-native";
import { React, useState, useContext, useEffect } from "react";
import { OrderContext, SettingsContext } from "../appContext";
import ColoredText from "../ColoredText";
import PriceTag from "../PriceTag";

const PaymentSummary = ({
  itemsCount,
  membersPriceTotal,
  deliveryPrice,
  taxPrice,
  fullTotal,
  setPaymentSummary,
}) => {
  const [tempData, setTempData] = useState({
    tax: 0,
    delivery: 0,
  });
  const { orderId } = useContext(OrderContext);

  useEffect(() => {
    this.deliveryInput.clear();
    this.taxInput.clear();
  }, [orderId]);

  return (
    <KeyboardAvoidingView
      className="absolute bottom-1 border-Agrey-200 border border-dotted pt-4 w-full rounded-2xl px-4 bg-Primary"
      behavior="padding"
      keyboardVerticalOffset={150}
    >
      <View className="flex flex-col">
        <View className="flex flex-row justify-between">
          <Text className="text-Agrey-200 text-xl">
            Total Items ({itemsCount})
          </Text>
          <PriceTag
            price={membersPriceTotal.toLocaleString()}
            colored={false}
            customStyles={"text-Tertiary text-xl"}
          />
        </View>
        <View className="flex flex-row justify-between">
          <Text className="text-Agrey-200 text-xl">Delivery</Text>
          <View className="flex-row items-center">
            <TextInput
              keyboardType="number-pad"
              ref={(component) => (this.deliveryInput = component)}
              inputMode="numeric"
              className="text-Tertiary text-xl w-16 text-right mb-2 border-b border-Tertiary"
              value={deliveryPrice}
              maxLength={5}
              onChangeText={(text) => {
                setTempData((prevTempData) => ({
                  ...prevTempData,
                  delivery: text,
                }));
              }}
              onBlur={() => {
                setPaymentSummary((prevPaymentSummary) => ({
                  ...prevPaymentSummary,
                  deliveryPrice: Number(tempData.delivery),
                }));
              }}
            ></TextInput>
            <PriceTag price={""} customStyles={"text-Tertiary text-xl"} />
          </View>
        </View>
        <View className="flex flex-row justify-between">
          <Text className="text-Agrey-200 text-xl">Tax</Text>
          <View className=" flex flex-row items-center">
            <TextInput
              keyboardType="number-pad"
              ref={(component) => (this.taxInput = component)}
              inputMode="numeric"
              className="text-Tertiary text-xl w-16 text-right mb-2 border-b border-Tertiary"
              value={taxPrice}
              maxLength={5}
              onChangeText={(text) => {
                setTempData((prevTempData) => ({ ...prevTempData, tax: text }));
              }}
              onBlur={() => {
                setPaymentSummary((prevPaymentSummary) => ({
                  ...prevPaymentSummary,
                  taxPrice: Number(tempData.tax),
                }));
              }}
            ></TextInput>
            <PriceTag price={""} customStyles={"text-Tertiary text-xl"} />
          </View>
        </View>

        <View className="flex flex-row justify-between pb-4">
          <ColoredText text={"Total"} customStyle="text-xl font-bold" />
          <PriceTag
            price={fullTotal.toLocaleString()}
            customStyles={"text-xl font-bold"}
            colored={true}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default PaymentSummary;
