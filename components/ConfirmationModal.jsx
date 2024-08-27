import Modal from "react-native-modal";
import { View, Text, TouchableOpacity } from "react-native";
import CustomButton from "./CustomButton";

const ConfirmationModal = ({
  isVisible,
  setIsVisible,
  message,
  onPressYes,
}) => {
  const onPressNo = () => {
    setIsVisible(false);
  };
  return (
    <Modal
      isVisible={isVisible}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      coverScreen={true}
      className=" w-full h-full m-0 items-center"
      onBackdropPress={onPressNo}
    >
      <View className="rounded-lg items-center w-10/12 px-3 pt-7 pb-4 bg-Agrey-100">
        <Text className="text-Tertiary text-center text-xl pb-6">
          {message}
        </Text>

        <View className="flex flex-row w-full space-x-3 items-center justify-center">
          {/* <TouchableOpacity
            onPress={onPressYes}
            className="bg-Secondary w-5/12 rounded-lg text-center py-4 items-center"
          >
            <Text className="text-Tertiary font-bold text-xl">Delete</Text>
          </TouchableOpacity> */}
          <CustomButton
            title={"Delete"}
            handlePress={onPressYes}
            containeyStyles={"rounded-lg py-4 px-8"}
            textStyles={"text-Tertiary text-center text-xl"}
          />

          <TouchableOpacity
            onPress={onPressNo}
            className="bg-Agrey-100  w-5/12 rounded-lg text-center py-4 items-center border border-Agrey-200"
          >
            <Text className="text-Tertiary text-xl">No</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
export default ConfirmationModal;
