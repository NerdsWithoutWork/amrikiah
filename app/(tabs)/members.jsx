import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { React, useState, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import MemberCard from "../../components/members/MemberCard.jsx";
import AddMemberModal from "../../components/members/AddMemberModal";
import ColoredText from "../../components/ColoredText.jsx";
import { DBContext } from "../../components/appContext.jsx";

const Members = () => {
  const { globalMembers, setGlobalMembers } = useContext(DBContext);
  // const [members, setMembers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  // const initializeMembers = async () => {
  //   setMembers(await getAllMembers());
  // };

  // useEffect(() => {
  //   initializeMembers();
  // }, []);

  // useEffect(() => { }, [members]);

  return (
    <SafeAreaView className="bg-Primary h-full px-3">
      <View className="relative">
        <AddMemberModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          members={globalMembers}
          setMembers={setGlobalMembers}
        />
      </View>
      <Text className="text-Tertiary text-center text-2xl font-semibold my-5">
        Members
      </Text>
      <FlatList
        data={globalMembers}
        keyExtractor={(item) => item.MemberID}
        renderItem={({ item }) => (
          <MemberCard
            key={item.MemberID}
            id={item.MemberID}
            name={item.MemberName}
            setMembers={setGlobalMembers}
          />
        )}
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: "center",
          padding: 10,
        }}
        ListFooterComponent={
          <TouchableOpacity
            className="p-4 w-full items-center justify-center"
            onPress={() => setModalVisible(true)}
          >
            <ColoredText
              text="+ Add a Member"
              customStyle="text-center font-bold"
            />
          </TouchableOpacity>
        }
      />

      <StatusBar style="light" />
    </SafeAreaView>
  );
};

export default Members;
