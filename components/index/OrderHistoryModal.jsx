import { View, Text, TouchableOpacity, Image } from "react-native";
import { React, useEffect, useState, useContext } from "react";
import Modal from "react-native-modal";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getAllRestaurants, addRestaurant } from "../../lib/restaurants";
import SelectableListItem from "../SelectableListItem";
import AddRestaurantModal from "../restaurant/AddRestaurantModal";
import { DBContext, OrderContext } from "../appContext";
import icons from "../../constants/icons";
import ColoredIcon from "../ColoredIcon";
import SelectableList from "../SelectableList";
import { getAllOrders } from "../../lib/orders";

const OrderHistoryModal = ({ modalVisible, setModalVisible }) => {
  const { SelectOrder } = useContext(OrderContext);
  const [orders, setOrders] = useState([]);
  const [orderId, setOrderId] = useState();
  const [listItemPressed, setListItemPressed] = useState(false);

  const closeModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    if (modalVisible) getAllOrders().then(setOrders);
  }, [modalVisible]);

  useEffect(() => {
    if (orderId && listItemPressed) {
      SelectOrder(orderId);
      setModalVisible(false);
      setListItemPressed(false);
    }
  }, [orderId, listItemPressed]);

  return (
    <Modal
      isVisible={modalVisible}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      coverScreen={true}
      customBackdropColor={"#FE8C00"}
      onBackdropPress={() => setModalVisible(false)}
      className=" z-10 w-full h-screen m-0 justify-end "
    >
      <SafeAreaView className="bg-Primary flex flex-col w-full items-center mb-4 px-4 h-[80vh] rounded-xl">
        <View className="w-full justify-end items-end">
          <TouchableOpacity
            className="w-10 items-center justify-center rounded-full p-2"
            onPress={() => closeModal()}
          >
            <ColoredIcon
              iconName={icons.close}
              customStyle="w-10 h-10"
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        {modalVisible && <SelectableList
          title="Order"
          data={orders.map((order) => ({
            id: order.OrderID,
            name: order.OrderID,
          }))}
          setId={setOrderId}
          setListItemPressed={setListItemPressed}
          setModalVisible={setModalVisible}
          // hidden={!modalVisible}
        />}
      </SafeAreaView>
    </Modal>
  );
};

export default OrderHistoryModal;
