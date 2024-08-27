import { View, Text, TouchableOpacity } from "react-native";
import { React, useState, useEffect, useContext } from "react";
import MemberOrderModal from "./MemberOrderModal";
import ModalWithButton from "../ModalWithButton";
import { deleteMeal } from "../../lib/meals";
import { SettingsContext } from "../appContext";
import ColoredText from "../ColoredText";
import PriceTag from "../PriceTag";

const MealCard = ({ mealId, mealName, mealPrice }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const goToMealPage = () => {
    setModalVisible(!modalVisible);
  };
  const [deleteModal, setDeleteModal] = useState(false);
  const [currency] = useContext(SettingsContext);
  return (
    <TouchableOpacity
      className="w-[90vw] rounded-2xl p-4 bg-Agrey-100 my-2"
      onPress={goToMealPage}
      onLongPress={() => setDeleteModal(!deleteModal)}
    >
      <MemberOrderModal
        modalVisible={modalVisible}
        mealId={mealId}
        mealName={mealName}
        mealPrice={mealPrice}
        setModalVisible={setModalVisible}
      />
      <ModalWithButton
        isVisible={deleteModal}
        setModalView={setDeleteModal}
        buttonText={"Delete " + mealName}
        onPress={() => deleteMeal(mealId)}
      />
      <View className="flex-row justify-between">
        <Text className="text-Tertiary text-xl">{mealName}</Text>
        <PriceTag price={mealPrice} customStyles={"text-lg"} colored={true}/>
      </View>
    </TouchableOpacity>
  );
};

export default MealCard;
