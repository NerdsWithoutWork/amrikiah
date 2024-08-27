import { View, Text, TouchableOpacity, Image } from "react-native";
import { React, useEffect, useState, useContext } from "react";
import Modal from "react-native-modal";
import { SafeAreaView } from "react-native-safe-area-context";
import { getAllMembers } from "../../lib/members";
import { getAllMeals } from "../../lib/meals";
import { addToOrder } from "../../lib/orders";
import AddMemberModal from "../members/AddMemberModal";
import SelectableList from "../SelectableList";
import icons from "../../constants/icons";
import { OrderContext } from "../appContext";
import ColoredIcon from "../ColoredIcon";
import { DBContext } from "../appContext";
import AddMealModal from "../restaurant/AddMealModal";

const SelectMemberMealModal = ({ modalVisible, setModalVisible }) => {
  // my spidey sense is tingling
  const { toggleDB, orderId, restaurantId } = useContext(OrderContext);

  const { globalMembers, setGlobalMembers, globalMeals, setGlobalMeals } =
    useContext(DBContext);

  // const [members, setMembers] = useState([]);
  const [showMemberModal, setShowMemberModal] = useState(false);
  const [memberId, setMemberId] = useState();
  const [showMemberList, setShowMemberList] = useState(true);

  //const [meals, setMeals] = useState([]);

  const [showMealModal, setShowMealModal] = useState(false);
  const [mealId, setMealId] = useState();
  const [showMealList, setShowMealList] = useState(false);

  // useEffect(() => {
  //   getAllMembers().then(setMembers);
  // }, []);

  //useEffect(() => {
  //  getAllMeals(restaurantId).then(setMeals);
  //}, [restaurantId]);

  const updateMeals = async () => {
    getAllMeals(restaurantId).then(setGlobalMeals);
  };

  useEffect(() => {
    setShowMemberList(true);
    updateMeals();
    setShowMealModal(false);
  }, [modalVisible]);

  const closeModal = () => {
    setMemberId(undefined);
    setMealId(undefined);
    setModalVisible(false);
  };

  useEffect(() => {
    if (memberId) {
      setShowMemberList(false);
      setShowMealList(true);
    }
  }, [memberId]);

  useEffect(() => {
    if (mealId) {
      addToOrder(orderId, memberId, mealId, 1);
      toggleDB();
      setMemberId(undefined);
      setMealId(undefined);
      setModalVisible(false);
    }
  }, [mealId]);

  return (
    <Modal
      isVisible={modalVisible}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      coverScreen={true}
      customBackdropColor={"#FE8C00"}
      onBackdropPress={() => setModalVisible(false)}
      className=" z-10 w-full h-screen m-0 justify-end"
    >
      <SafeAreaView className="bg-Primary flex flex-col w-full items-center mb-4 px-4 h-[80vh] rounded-xl">
        <View className="w-full justify-end items-end">
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
        {showMemberList && (
          <SelectableList
            title="Member"
            data={globalMembers.map((member) => ({
              id: member.MemberID,
              name: member.MemberName,
            }))}
            setAddModalVisible={setShowMemberModal}
            AddModalVisible={showMemberModal}
            setModalVisible={setModalVisible}
            setId={setMemberId}
          />
        )}
        {showMealList && (
          <SelectableList
            title="Meal"
            data={globalMeals.map((meal) => ({
              id: meal.MealID,
              name: meal.MealName,
              price: meal.MealPrice,
            }))}
            setAddModalVisible={setShowMealModal}
            AddModalVisible={showMealModal}
            setModalVisible={setModalVisible}
            setId={setMealId}
          />
        )}
      </SafeAreaView>
      <AddMemberModal
        modalVisible={showMemberModal}
        setModalVisible={setShowMemberModal}
        setMembers={setGlobalMembers}
      />
      <AddMealModal
        modalVisible={showMealModal}
        setModalVisible={setShowMealModal}
        restaurantId={restaurantId}
        setMeals={setGlobalMeals}
      />
    </Modal>
  );
};

export default SelectMemberMealModal;
