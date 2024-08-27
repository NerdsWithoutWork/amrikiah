import { TouchableOpacity, Text, Image, View } from "react-native";
import images from "../constants/images";
import icons from "../constants/icons";
import ColoredIcon from "./ColoredIcon";
import PriceTag from "./PriceTag";

const SelectableListItem = ({ title, item, setId, setListItemPressed }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        setId(item.id);
        if (setListItemPressed) setListItemPressed(true);
      }}
      className="relative w-full h-20 items-center justify-center my-2 rounded-md overflow-hidden"
    >
      {title === "Restaurant" ? (
        <View className=" w-full h-full items-center flex flex-row justify-between">
          <Image
            source={
              item.Image === ""
                ? images.restaurant_placeholder
                : { uri: item.Image }
            }
            resizeMode="cover"
            className="w-full h-full absolute z-10"
          />
          <View className="absolute z-20 flex flex-row items-center justify-between bg-Primary/60 w-full h-full px-4">
            <Text className="text-Tertiary text-xl">{item.name}</Text>
            <ColoredIcon
              iconName={item.isFavorite ? icons.heart_filled : icons.heart}
              customStyle={"w-7 h-7"}
              resizeMode={"contain"}
            />
          </View>
        </View>
      ) : title === "Member" ? (
        <View className="bg-Agrey-100 w-full h-full items-center flex flex-row justify-between px-4">
          <Text className="text-Tertiary text-xl">{item.name}</Text>
        </View>
      ) : title === "Meal" ? (
        <View className="w-full h-full items-center flex flex-row justify-between bg-Agrey-100 px-4">
          <Text className="text-Tertiary text-xl">{item.name}</Text>

          <PriceTag price={item.price} customStyles="text-Tertiary text-xl" />
        </View>
      ) : (
        <View className="w-full h-full items-center flex flex-row justify-between bg-Agrey-100 px-4">
          <Text className="text-Tertiary text-xl">{"Order #" + item.name}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default SelectableListItem;
