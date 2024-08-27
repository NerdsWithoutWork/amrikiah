import {
  View,
  Text,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { React, useState, useEffect } from "react";
import Modal from "react-native-modal";
import FormField from "../FormField";
import CustomButton from "../CustomButton";
import { getAllRestaurants, addRestaurant } from "../../lib/restaurants";
import icons from "../../constants/icons";
import ColoredText from "../ColoredText";
import ColoredIcon from "../ColoredIcon";
const RestaurantSlideSheet = ({
  modalVisible,
  setModalVisible,
  setRestaurants,
}) => {
  const [imageChosen, setImageChosen] = useState(false);
  const [restaurant, setRestaurant] = useState({
    name: "",
    category: "",
    image: "",
  });

  const pickImage = async () => {
    try {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 1,
        base64: true,
      });

      if (result && !result.canceled) {
        setRestaurant({ ...restaurant, image: result.assets[0].uri });
        setImageChosen(true);
      } else {
        setImageChosen(false);
        setRestaurant({ ...restaurant, image: "" });
      }
    } catch (error) {
      console.log("Error launching image library: ", error);
    }
  };
  const submit = async (
    restaurantName,
    restaurantCategory,
    restaurantImage
  ) => {
    try {
      await addRestaurant(restaurantName, restaurantCategory, restaurantImage);
      setRestaurants(await getAllRestaurants());
      closeModal();
    } catch (error) {
      console.error("Error submitting restaurant:", error);
      throw error;
    }
  };

  const closeModal = () => {
    setImageChosen(false);
    setRestaurant({
      name: "",
      category: "",
      image: "",
    });
    setModalVisible(false);
  };

  return (
    <Modal
      isVisible={modalVisible}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      coverScreen={true}
      customBackdropColor={"#FE8C00"}
      className="z-10 w-full h-full m-0 justify-end"
      onBackdropPress={() => {
        closeModal();
      }}
    >
      <KeyboardAvoidingView behavior={"padding"}>
        <View className="space-y-10 rounded-t-lg bg-Primary items-center py-10 px-4">
          <View className="w-full justify-end items-end h-10">
            <TouchableOpacity
              className=" w-10 items-center justify-center rounded-full p-2"
              onPress={() => {
                closeModal();
              }}
            >
              <ColoredIcon
                iconName={icons.close}
                customStyle={"w-10 h-10"}
                resizeMode={"contain"}
              />
            </TouchableOpacity>
          </View>
          <Text className="text-Tertiary text-3xl text-center font-semibold">
            Add Restaurant
          </Text>
          <View className=" w-full px-5">
            <TouchableOpacity
              className="bg-Agrey-100 w-full h-40 justify-center items-center space-y-3"
              onPress={pickImage}
            >
              {imageChosen ? (
                <>
                  <Image
                    source={{ uri: restaurant.image }}
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                  <ColoredText
                    text={"Change Image"}
                    customStyle={"absolute p-2 bg-Primary"}
                  />
                </>
              ) : (
                <>
                  <ColoredIcon
                    iconName={icons.camera}
                    customStyle={"w-10 h-10"}
                    resizeMode={"contain"}
                  />
                  <ColoredText text="Add Image" />
                </>
              )}
            </TouchableOpacity>
            <FormField
              title="Restaurant Name"
              value={restaurant.name}
              handleChangeText={(e) =>
                setRestaurant({ ...restaurant, name: e })
              }
              keyboardType="string"
            />
            <FormField
              title="Restaurant Category"
              value={restaurant.category}
              handleChangeText={(e) =>
                setRestaurant({ ...restaurant, category: e })
              }
              keyboardType="string"
            />
            <CustomButton
              title={"Add"}
              isDisabled={!restaurant.name || !restaurant.category}
              containeyStyles={"mt-5"}
              handlePress={() => {
                submit(restaurant.name, restaurant.category, restaurant.image);
              }}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default RestaurantSlideSheet;
