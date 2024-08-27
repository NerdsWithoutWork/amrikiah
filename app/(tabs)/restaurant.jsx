import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import { React, useState, useEffect, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "../../constants/images.js";
import { StatusBar } from "expo-status-bar";
import AddRestaurantModal from "../../components/restaurant/AddRestaurantModal.jsx";
import RestaurantCard from "../../components/restaurant/RestaurantCard.jsx";
import ColoredText from "../../components/ColoredText.jsx";
import { DBContext } from "../../components/appContext.jsx";

const restaurant = () => {
  //const [restaurants, setRestaurants] = useState([]);
  const { globalRestaurants, setGlobalRestaurants } = useContext(DBContext);
  const [modalVisible, setModalVisible] = useState(false);

  //const initializeRestaurants = async () => {
  //  await initializeDatabase();
  //  setRestaurants(await getAllRestaurants());
  //};
  //
  //useEffect(() => {
  //  initializeRestaurants();
  //}, []);

  useEffect(() => {}, [globalRestaurants]);

  return (
    <SafeAreaView className="bg-Primary h-full items-center">
      <StatusBar backgroundColor="#1F1D1D" style="light" />

      <View>
        <AddRestaurantModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          setRestaurants={setGlobalRestaurants}
        />
        <Text className="text-Tertiary text-center text-2xl font-semibold my-5">
          Restaurants
        </Text>
      </View>
      <FlatList
        data={globalRestaurants.sort((a, b) =>
          a.isFavorite === b.IsFavorite ? 0 : a.IsFavorite ? -1 : 1
        )}
        numColumns={2}
        contentContainerStyle={{alignItems:'start'}}
        keyExtractor={(item) => item.RestaurantID}
        renderItem={({ item }) => (
          <RestaurantCard
            category={item.RestaurantCategory}
            headImage={item.RestaurantImage}
            isFavorite={item.IsFavorite}
            restaurantId={item.RestaurantID}
            title={item.RestaurantName}
            setRestaurants={setGlobalRestaurants}
          />
        )}
        ListFooterComponent={
          <TouchableOpacity
            className=" w-full items-center justify-center py-5"
            onPress={() => setModalVisible(true)}
          >
            <ColoredText
              text="+ Add a Restaurant"
              customStyle="text-center font-bold"
            />
          </TouchableOpacity>
        }
      />
    </SafeAreaView>
  );
};

export default restaurant;
