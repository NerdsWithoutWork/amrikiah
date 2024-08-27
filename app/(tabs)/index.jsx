import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { OrderContext } from "../../components/appContext";
import OrderDetails from "../../components/index/OrderDetails";
import { getRestaurantName } from "../../lib/restaurants";
import SelectRestaurantModal from "../../components/index/SelectRestaurantModal";
import OrderHistoryModal from "../../components/index/OrderHistoryModal";
import icons from "../../constants/icons";
import ColoredText from "../../components/ColoredText";
import ColoredIcon from "../../components/ColoredIcon";

const index = () => {
  const { dbUpdate, createOrder, orderId, restaurantId } =
    useContext(OrderContext);
  const [showRestaurantModal, setShowRestaurantModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [restaurantName, setRestaurantName] = useState();

  const fetchRestaurantName = async () => {
    if (restaurantId) {
      setRestaurantName(await getRestaurantName(restaurantId));
    }
  };

  const createNewOrder = () => {
    setShowRestaurantModal(!showRestaurantModal);
  };

  useEffect(() => {
    fetchRestaurantName();
  }, [restaurantId]);

  return (
    <SafeAreaView className="relative flex flex-col bg-Primary h-full overflow-hidden items-center px-4">
      <View className="flex flex-col w-full mt-5 items-center mb-4 h-[10%]">
        <View className="flex flex-row w-full items-center space-x-4">
          <Text className="flex-grow text-Tertiary font-semibold text-2xl">
            Order #{orderId}
          </Text>

          <TouchableOpacity onPress={() => setShowHistoryModal(true)}>
            <ColoredIcon
              iconName={icons.history}
              customStyle="w-6 h-6"
              resizeMode={"contain"}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={createNewOrder}>
            <ColoredIcon
              iconName={icons.plus}
              customStyle="w-9 h-9"
              resizeMode={"contain"}
            />
          </TouchableOpacity>
        </View>

        <ColoredText
          text={restaurantName}
          customStyle={" font-bold text-2xl px-4"}
        />
      </View>

      {!orderId && (
        <View className="grow justify-center">
          <Text className="text-center text-Tertiary text-l">
            Looks like you didn't create an order yet!
          </Text>
          <TouchableOpacity onPress={createNewOrder}>
            <ColoredText
              text="+ Create Order"
              customStyle="text-center font-bold mb-4"
            />
          </TouchableOpacity>
        </View>
      )}
      {orderId && (
        <OrderDetails
          dbUpdate={dbUpdate}
          orderId={orderId}
          restaurantId={restaurantId}
        />
      )}
      <SelectRestaurantModal
        modalVisible={showRestaurantModal}
        setModalVisible={setShowRestaurantModal}
        createOrder={createOrder}
      />
      <OrderHistoryModal
        modalVisible={showHistoryModal}
        setModalVisible={setShowHistoryModal}
      />
      <StatusBar backgroundColor="#1F1D1D" style="light" />
      {/* <View className="bg-red-500 h-[1%] absolute bottom-0">
        <Text>Hi</Text>
      </View> */}
    </SafeAreaView>
  );
};

export default index;
