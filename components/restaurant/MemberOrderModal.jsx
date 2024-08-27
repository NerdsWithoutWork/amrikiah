import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { React, useState, useEffect, useContext } from "react";
import Modal from "react-native-modal";
import MemberOrderCard from "./MemberOrderCard";
import icons from "../../constants/icons";
import CustomButton from "../CustomButton";
import {
  addToOrder,
  getMemberMealCount,
  deleteMemberMealOrder,
} from "../../lib/orders";
import {
  DBContext,
  OrderContext,
  SettingsContext,
} from "../../components/appContext";
import ColoredText from "../ColoredText";
import ColoredIcon from "../ColoredIcon";
import PriceTag from "../PriceTag";

const MemberOrderModal = ({
  modalVisible,
  mealId,
  mealName,
  mealPrice,
  setModalVisible,
  restaurantId,
}) => {
  const { toggleDB, createOrder, orderId } = useContext(OrderContext);
  const { globalMembers } = useContext(DBContext);
  const [mealOrder, setMealOrder] = useState([]);
  const [totalItems, setTotalItems] = useState(0);

  const submitMealOrder = async () => {
    for (const memberMeal of mealOrder) {
      const oId = orderId ? orderId : await createOrder(restaurantId);
      if (memberMeal.mealCount > 0) {
        addToOrder(oId, memberMeal.memberId, mealId, memberMeal.mealCount);
      } else if (memberMeal.mealCount == 0) {
        deleteMemberMealOrder(oId, memberMeal.memberId, mealId);
      }
    }
    setModalVisible(false);
    toggleDB();
  };

  const updateMealCount = (memberId, mealCount) => {
    setMealOrder((mealOrder) =>
      mealOrder.map((member) =>
        member.memberId === memberId
          ? { ...member, mealCount: mealCount }
          : member
      )
    );
  };

  const getInitialMealOrder = async () => {
    const initialMealOrder = await Promise.all(
      globalMembers.map(async (member) => {
        try {
          let count = await getMemberMealCount(
            orderId,
            mealId,
            member.MemberID
          );
          return {
            memberId: member.MemberID,
            memberName: member.MemberName,
            mealCount: count ? count : 0,
          };
        } catch (error) {
          console.log(error);
        }
      })
    );
    setMealOrder(initialMealOrder);
  };

  const calculateTotalItems = () => {
    const totalOrdersArray = mealOrder.map((item) => item.mealCount);
    const totalItems = totalOrdersArray.reduce((sum, count) => sum + count, 0);
    setTotalItems(totalItems);
  };

  useEffect(() => {
    calculateTotalItems();
  }, [mealOrder]);

  useEffect(() => {
    getInitialMealOrder();
  }, []);

  return (
    <Modal
      isVisible={modalVisible}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      coverScreen={true}
      className="absolute bottom-0 w-full h-[80vh] m-0 bg-Primary"
      onBackdropPress={() => setModalVisible(false)}
    >
      <View>
        <TouchableOpacity
          className=" w-full items-end justify-center rounded-full p-2"
          onPress={() => setModalVisible(false)}
        >
          <ColoredIcon
            iconName={icons.close}
            customStyle={"w-10 h-10"}
            resizeMode={"contain"}
          />
        </TouchableOpacity>
      </View>
      <View className="flex-row justify-between items-center mx-5 mt-4 mb-4">
        <Text className="text-Tertiary text-2xl font-semibold w-1/2">
          {mealName}
        </Text>

        <PriceTag
          price={mealPrice.toLocaleString()}
          colored={true}
          customStyles={"text-2xl font-semibold"}
        />
      </View>

      {globalMembers == [] ? (
        <Text>YES</Text>
      ) : (
        <FlatList
          data={mealOrder}
          keyExtractor={(item) => item.memberId}
          renderItem={({ item }) => (
            <MemberOrderCard
              key={item.memberId}
              memberId={item.memberId}
              memberName={item.memberName}
              mealCount={item.mealCount}
              updateMealCount={updateMealCount}
            />
          )}
          contentC
          ontainerStyle={{
            flexGrow: 1,
            padding: 10,
          }}
        />
      )}
      <View className="items-center justify-center my-10">
        <CustomButton
          title={"Confirm Order (" + totalItems + ")"}
          containeyStyles={""}
          isDisabled={false}
          handlePress={() => submitMealOrder()}
        />
      </View>
    </Modal>
  );
};

export default MemberOrderModal;
