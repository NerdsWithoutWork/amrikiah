import {
  FlatList,
  TouchableOpacity,
  View,
  Text,
  KeyboardAvoidingView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { getOrderMembers, getMemberOrderSummary } from "../../lib/orders";
import PaymentSummary from "./PaymentSummary";
import MemberPaymentSummary from "./MemberPaymentSummary";
import SelectMemberMealModal from "./SelectMemberMealModal";
import ColoredText from "../ColoredText";
import { SafeAreaView } from "react-native-safe-area-context";

const OrderDetails = ({ dbUpdate, orderId }) => {
  const [paymentSummary, setPaymentSummary] = useState({
    itemsCount: 0,
    membersPriceTotal: 0,
    taxPrice: 0,
    deliveryPrice: 0,
    fullTotal: 0,
  });
  const [memberOrderSummary, setMemberOrderSummary] = useState([]);
  const [memberModalVisible, setMemberModalVisible] = useState(false);

  const setOrderSummary = async (members) => {
    const initialOrderSummary = await Promise.all(
      members.map(async (member) => {
        try {
          return {
            id: member.MemberID,
            memberName: member.MemberName,
            meals: await getMemberOrderSummary(orderId, member.MemberID),
          };
        } catch (error) {
          console.log(error);
        }
      })
    );
    setMemberOrderSummary(initialOrderSummary);
  };
  useEffect(() => {
    getOrderMembers(orderId).then(setOrderSummary);
  }, [dbUpdate, orderId]);

  useEffect(() => {
    setPaymentSummary({
      ...paymentSummary,
      taxPrice: 0,
      deliveryPrice: 0,
    });
  }, [orderId]);

  const [indivisualTax_Delivery, setIndivisualTax_Delivery] = useState({
    tax: 0,
    delivery: 0,
  });

  const indivisualTaxAndDeliveryCalc = () => {
    let tax = 0;
    let delivery = 0;
    let membersCount = 0;

    membersCount = memberOrderSummary.length;

    if (membersCount > 0) {
      tax = paymentSummary.taxPrice / membersCount;
      delivery = paymentSummary.deliveryPrice / membersCount;

      setIndivisualTax_Delivery((prevIndivisualTax_Delivery) => ({
        ...prevIndivisualTax_Delivery,
        tax: tax,
        delivery: delivery,
      }));
    }
  };

  const calculateMemberTotal = (memberSum) => {
    let total = 0;
    memberSum.meals.forEach((item) => {
      total += item.MealPrice * item.MealCount;
    });
    return total + indivisualTax_Delivery.tax + indivisualTax_Delivery.delivery;
  };

  const calculateMembersTotal = () => {
    let total = 0;

    if (memberOrderSummary.length > 0) {
      memberOrderSummary.forEach((memberSum) => {
        total +=
          calculateMemberTotal(memberSum) -
          indivisualTax_Delivery.tax -
          indivisualTax_Delivery.delivery;
      });
    }

    setPaymentSummary((prevPaymentSummary) => ({
      ...prevPaymentSummary,
      membersPriceTotal: total,
    }));
  };

  const calculateItemsCount = () => {
    let total = 0;
    memberOrderSummary.forEach((member) => {
      member.meals.forEach((item) => {
        total += item.MealCount;
      });
    });
    setPaymentSummary((prevPaymentSummary) => ({
      ...prevPaymentSummary,
      itemsCount: total,
    }));
  };

  const calculateTotal = () => {
    setPaymentSummary((prevPaymentSummary) => ({
      ...prevPaymentSummary,
      fullTotal:
        prevPaymentSummary.membersPriceTotal +
        prevPaymentSummary.deliveryPrice +
        prevPaymentSummary.taxPrice,
    }));
  };

  useEffect(() => {
    calculateMembersTotal();
    calculateItemsCount();
    indivisualTaxAndDeliveryCalc();
    calculateTotal();
  }, [
    paymentSummary.totalItems,
    paymentSummary.membersTotal,
    paymentSummary.deliveryPrice,
    paymentSummary.taxPrice,
    memberOrderSummary,
  ]);
  return (
    <View className="relative w-full flex flex-col flex-grow justify-between ">
      <SelectMemberMealModal
        modalVisible={memberModalVisible}
        setModalVisible={setMemberModalVisible}
      />
      <View className="w-full items-center max-h-[70%]">
        <FlatList
          data={memberOrderSummary}
          keyExtractor={(item) => item.id}
          // contentContainerStyle={{
          //   maxHeight: "60%",
          // }}
          renderItem={({ item }) => (
            <MemberPaymentSummary
              key={item.id}
              memberName={item.memberName}
              total={calculateMemberTotal(item)}
              memberItems={item.meals}
              indivisualTax_Delivery={indivisualTax_Delivery}
            />
          )}
          ListFooterComponent={
            <TouchableOpacity
              className="p-3 w-full items-center justify-center mb-2"
              onPress={() => setMemberModalVisible(true)}
            >
              <ColoredText
                text={"+ Add Member"}
                customStyle="font-bold text-l"
              />
            </TouchableOpacity>
          }
        />
      </View>

      <PaymentSummary
        itemsCount={paymentSummary.itemsCount}
        membersPriceTotal={paymentSummary.membersPriceTotal}
        deliveryPrice={paymentSummary.deliveryPrice}
        taxPrice={paymentSummary.taxPrice}
        fullTotal={paymentSummary.fullTotal}
        setPaymentSummary={setPaymentSummary}
      />
    </View>
  );
};

export default OrderDetails;
