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

const SelectRestaurantModal = ({
  modalVisible,
  setModalVisible,
  createOrder,
}) => {
  //const [restaurants, setRestaurants] = useState([]);
  const { globalRestaurants, setGlobalRestaurants } = useContext(DBContext);
  const [showRestaurantModal, setShowRestaurantModal] = useState(false);
  const [restaurantId, setRestaurantId] = useState();
  const [listItemPressed, setListItemPressed] = useState(false);

  //useEffect(() => {
  //  getAllRestaurants().then(setRestaurants);
  //}, []);

  const closeModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    if (restaurantId && listItemPressed) {
      createOrder(restaurantId);
      setModalVisible(false);
      setListItemPressed(false);
    }
  }, [restaurantId, listItemPressed]);

  useEffect(() => {}, [showRestaurantModal]);

  return (
    <Modal
      isVisible={modalVisible}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      coverScreen={true}
      customBackdropColor={"#FE8C00"}
      onBackdropPress={() => setModalVisible(false)}
      className=" z-10 w-full h-screen m-0 justify-end"
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
        {modalVisible && (
          <SelectableList
            title="Restaurant"
            setAddModalVisible={setShowRestaurantModal}
            AddModalVisible={showRestaurantModal}
            data={globalRestaurants
              .sort((a, b) =>
                a.isFavorite === b.IsFavorite ? 0 : a.IsFavorite ? -1 : 1
              )
              .map((restaurant) => ({
                id: restaurant.RestaurantID,
                name: restaurant.RestaurantName,
                isFavorite: restaurant.IsFavorite ? true : false,
                Image: restaurant.RestaurantImage,
              }))}
            setId={setRestaurantId}
            setListItemPressed={setListItemPressed}
            setModalVisible={setModalVisible}
          />
        )}
      </SafeAreaView>
      <AddRestaurantModal
        modalVisible={showRestaurantModal}
        setModalVisible={setShowRestaurantModal}
        setRestaurants={setGlobalRestaurants}
      />
    </Modal>
  );
};

export default SelectRestaurantModal;