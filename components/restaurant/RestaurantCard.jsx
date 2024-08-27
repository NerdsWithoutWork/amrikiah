import { View, Text, TouchableOpacity, Image } from "react-native";
import { React, useState } from "react";
import icons from "../../constants/icons";
import ConfirmationModal from "../ConfirmationModal";
import {
  deleteRestaurant,
  getAllRestaurants,
  setRestaurantFavorite,
} from "../../lib/restaurants";
import images from "../../constants/images";
import { router, useRouter } from "expo-router";
import ColoredText from "../ColoredText";
import ColoredIcon from "../ColoredIcon";

const RestaurantCard = ({
  title,
  headImage,
  category,
  isFavorite,
  restaurantId,
  setRestaurants,
}) => {
  const router = useRouter();

  const favorite = async () => {
    try {
      await setRestaurantFavorite(restaurantId, !isFavorite);
      setRestaurants(await getAllRestaurants());
    } catch (error) {
      console.error("Error favoriting restaurant:", error);
      throw error;
    }
  };

  const deleteRest = async (id) => {
    try {
      await deleteRestaurant(id);
      setRestaurants(await getAllRestaurants());
    } catch (error) {
      console.error("Error deleting restaurant:", error);
      throw error;
    }
  };

  const goToPage = () => {
    router.push({
      pathname: "/restaurantPage",
      params: {
        title: title,
        headImage: headImage,
        category: category,
        isFavorite: isFavorite,
        restaurantId: restaurantId,
      },
    });
  };

  const [modalView, setModalView] = useState(false);

  return (
    <TouchableOpacity
      className="bg-Agrey-100 rounded-3xl w-[45vw] my-1 mx-1"
      activeOpacity={0.7}
      onPress={() => goToPage()}
      onLongPress={() => setModalView(true)}
    >
      <ConfirmationModal
        message={"Are you sure you want to delete " + title}
        isVisible={modalView}
        setIsVisible={setModalView}
        onPressYes={() => deleteRest(restaurantId)}
      />
      <View className="bg-Agrey-100 p-2 rounded-2xl">
        <View className="">
          <Image
            source={
              headImage === ""
                ? images.restaurant_placeholder
                : { uri: headImage }
            }
            className="w-full h-36 rounded-2xl"
            resizeMode="cover"
          />
          <TouchableOpacity
            className="absolute top-1 right-1 bg-Tertiary p-2 rounded-full"
            onPress={() => favorite()}
          >
            <ColoredIcon
              iconName={isFavorite ? icons.heart_filled : icons.heart}
              customStyle={"w-5 h-5"}
              resizeMode={"contain"}
            />
          </TouchableOpacity>
        </View>

        <View className="py-2">
          <Text className="text-Tertiary text-xl font-bold ">{title}</Text>

          <ColoredText text={category} customStyle={" text-sm font-semibold"} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RestaurantCard;
