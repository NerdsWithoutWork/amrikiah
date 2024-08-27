import {
  View,
  Text,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import { React, useState } from "react";
import Modal from "react-native-modal";
import FormField from "../FormField";
import CustomButton from "../CustomButton";
import icons from "../../constants/icons";
import { addMeal, getAllMeals } from "../../lib/meals";
import ColoredIcon from "../ColoredIcon";

const AddMealModal = ({
  modalVisible,
  setModalVisible,
  restaurantId,
  setMeals,
}) => {
  const [mealName, setMealName] = useState("");
  const [mealPrice, setMealPrice] = useState(null);

  const submit = async (mealName, mealPrice) => {
    await addMeal(restaurantId, mealName, mealPrice);
    const m = await getAllMeals(restaurantId);
    setMeals(m);
    closeModal();
  };

  const closeModal = () => {
    setMealName("");
    setMealPrice("");
    setModalVisible(false);
  };

  return (
    <Modal
      isVisible={modalVisible}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      coverScreen={true}
      customBackdropColor={"#FE8C00"}
      onBackdropPress={() => closeModal()}
      className=" z-10 w-full h-full m-0 justify-end"
    >
      <KeyboardAvoidingView behavior={"padding"}>
        <View className="bg-Primary space-y-10 rounded-t-lg items-center py-10 px-4 ">
          <View className="w-full justify-end items-end h-10">
            <TouchableOpacity
              className="w-10 items-center justify-center rounded-full p-2"
              onPress={() => closeModal()}
            >
              <ColoredIcon
                iconName={icons.close}
                customStyle={"w-10 h-10"}
                resizeMode={"contain"}
              />
            </TouchableOpacity>
          </View>
          <Text className="text-Tertiary text-3xl text-center font-semibold">
            Add Meal
          </Text>
          <View className="mt-5 w-full px-5 bg-Primary">
            <FormField
              title="Meal Name"
              value={mealName}
              handleChangeText={(e) => setMealName(e)}
              keyboardType="string"
            />
            <FormField
              title="Meal Price"
              value={mealPrice}
              handleChangeText={(e) => setMealPrice(e)}
              keyboardType="number-pad"
            />
            <CustomButton
              title={"Add"}
              isDisabled={!mealName || !mealPrice}
              containeyStyles={"mt-5"}
              handlePress={() => {
                submit(mealName, mealPrice);
              }}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default AddMealModal;
