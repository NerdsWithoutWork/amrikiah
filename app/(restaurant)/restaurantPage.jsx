import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import { React, useState, useEffect, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "../../constants/icons";
import { useLocalSearchParams } from "expo-router";
import MealCard from "../../components/restaurant/MealCard";
import AddMealModal from "../../components/restaurant/AddMealModal";
import images from "../../constants/images";
import { getAllMeals } from "../../lib/meals";
import ColoredText from "../../components/ColoredText";
import { DBContext } from "../../components/appContext";
import ColoredIcon from "../../components/ColoredIcon";

const restaurantPage = () => {
  const { title, headImage, category, isFavorite, restaurantId } =
    useLocalSearchParams();
  const [modalVisible, setModalVisible] = useState(false);

  const { globalMembers } = useContext(DBContext);

  const [meals, setMeals] = useState([]);

  const fetchMeals = async () => {
    getAllMeals(restaurantId).then(setMeals);
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  useEffect(() => { }, [globalMembers, meals]);

  return (
    <SafeAreaView className="bg-Primary h-full">
      <View className="relative mb-5">
        <Image
          source={
            headImage === ""
              ? images.restaurant_placeholder
              : { uri: headImage }
          }
          className="w-full h-[30vh] opacity-50"
          resizeMode="cover"
        />
        <View className="absolute top-4 right-4 bg-Tertiary p-2 rounded-full">
          <ColoredIcon
            iconName={isFavorite === "1" ? icons.heart_filled : icons.heart}
            resizeMode="contain"
            customStyle="w-6 h-6"
          />
        </View>
        <Text className="absolute text-Tertiary text-3xl font-bold mt-20 mx-4">
          {title}
        </Text>
        <ColoredText
          text={category}
          customStyle="absolute text-2xl font-bold mt-28 mx-4"
        />
      </View>
      <FlatList
        data={meals}
        keyExtractor={(item) => item.MealID}
        renderItem={({ item }) => (
          <MealCard
            key={item.MealID}
            mealId={item.MealID}
            mealName={item.MealName}
            mealPrice={item.MealPrice}
            restaurantId={restaurantId}
          />
        )}
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: "center",
          padding: 10,
        }}
      />
      <View className="items-center justify-center">
        <TouchableOpacity
          className="p-4 w-full items-center justify-center"
          onPress={() => setModalVisible(true)}
        >
          <ColoredText
            text="+ Add a Meal"
            customStyle="text-center text-lg font-semibold"
          />
        </TouchableOpacity>
      </View>
      <AddMealModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        restaurantId={restaurantId}
        setMeals={setMeals}
      />
    </SafeAreaView>
  );
};

export default restaurantPage;
