import { View, Text, Image, TouchableOpacity } from "react-native";
import { React, useState } from "react";
import icons from "../../constants/icons";
import ConfirmationModal from "../ConfirmationModal";
import { deleteMember, getAllMembers } from "../../lib/members";
import ColoredIcon from "../ColoredIcon";

const MemberCard = ({ id, name, setMembers }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const submit = async (id) => {
    try {
      await deleteMember(id);
      updateMember();
    } catch (error) {
      console.error("Error deleting member:", error);
      throw error;
    }
  };

  const updateMember = async () => {
    setMembers(await getAllMembers());
  };
  return (
    <View className="flex flex-row items-center justify-between rounded-2xl w-full px-4 py-5 border-Agrey-100 border-2 my-2">
      <ConfirmationModal
        isVisible={modalVisible}
        message={`Are you sure you want to delete ${name} ?`}
        onPressYes={() => submit(id)}
        onPressNo={() => setModalVisible(false)}
        setIsVisible={setModalVisible}
      />
      <Text className="text-Tertiary text-lg font-bold">{name}</Text>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <ColoredIcon iconName={icons.trash} customStyle="w-6 h-6" resizeMode={"contain"}/>
      </TouchableOpacity>
    </View>
  );
};

export default MemberCard;
