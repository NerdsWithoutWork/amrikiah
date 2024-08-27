import { View, Image, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import CustomButton from "./CustomButton";
import React from "react";
import icons from "../constants/icons";
import ColoredIcon from "./ColoredIcon";

const ModalWithButton = ({ isVisible, setModalView, onPress, buttonText }) => {
  return (
    <Modal
      isVisible={isVisible}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      coverScreen={true}
      className="absolute z-20 w-full h-full m-0"
      onBackdropPress={() => setModalView(false)}
    >
      <View className="absolute bottom-0 w-full h-[25vh] rounded-t-lg bg-Primary items-center py-5 px-4">
        <TouchableOpacity
          className=" w-full items-end justify-center rounded-full p-2"
          onPress={() => setModalView(false)}
        >
          <ColoredIcon
            iconName={icons.close}
            customStyle="w-10 h-10"
            resizeMode="contain"
          />
        </TouchableOpacity>
        <CustomButton
          containeyStyles={"w-full mt-4 bg-red-600"}
          title={buttonText}
          handlePress={() => {
            onPress();
            setModalView(false);
          }}
          isDisabled={false}
        />
      </View>
    </Modal>
  );
};

export default ModalWithButton;
