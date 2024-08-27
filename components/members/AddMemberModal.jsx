import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { React, useState } from "react";
import Modal from "react-native-modal";
import FormField from "../FormField";
import CustomButton from "../CustomButton";
import { getAllMembers, addMember } from "../../lib/members";
import icons from "../../constants/icons";
import ColoredIcon from "../ColoredIcon";
import Popup from "../Popup";

const AddMemberModal = ({ modalVisible, setModalVisible, setMembers }) => {
  const [name, setName] = useState("");
  const [trigger, setTrigger] = useState(false);

  const submit = async (memberName) => {
    if (!memberName) {
      console.error("Empty Name");
      return;
    }

    try {
      await addMember(memberName);
      setTrigger(!trigger);
      setMembers(await getAllMembers());
      setName("");
    } catch (error) {
      console.error("Error submitting member:", error);
      throw error;
    }
  };
  return (
    <Modal
      isVisible={modalVisible}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      coverScreen={true}
      customBackdropColor={"#FE8C00"}
      onBackdropPress={() => setModalVisible(false)}
      className="relative z-10 w-full h-full m-0 justify-end items-center"
    >
      <Popup message={"added " + name} trigger={trigger} />
      <KeyboardAvoidingView behavior={"padding"} className="w-full">
        <View className="bg-Primary space-y-10 rounded-t-lg items-center py-10 px-4 ">
          <View className="w-full justify-end items-end h-10">
            <TouchableOpacity
              className="w-10 items-center justify-center rounded-full p-2"
              onPress={() => setModalVisible(false)}
            >
              <ColoredIcon
                iconName={icons.close}
                customStyle="w-10 h-10"
                resizeMode={"contain"}
              />
            </TouchableOpacity>
          </View>
          <Text className="text-Tertiary text-3xl text-center font-semibold">
            Add Member
          </Text>
          <View className="mt-5 w-full px-5 bg-Primary">
            <FormField
              title="Member Name"
              value={name}
              handleChangeText={(e) => setName(e)}
              keyboardType="string"
            />
            <CustomButton
              title={"Add"}
              isDisabled={!name}
              containeyStyles={"mt-5"}
              handlePress={() => {
                submit(name);
              }}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default AddMemberModal;
