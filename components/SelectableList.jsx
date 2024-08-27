import { View, Text, TouchableOpacity, FlatList } from "react-native";
import SelectableListItem from "./SelectableListItem";
import icons from "../constants/icons";
import ColoredIcon from "./ColoredIcon";
const SelectableList = ({
  title,
  data,
  setAddModalVisible,
  AddModalVisible,
  setModalVisible,
  setId,
  setListItemPressed,
}) => {
  return (
    <View className="bg-Primary flex flex-col w-full items-center mb-4 px-4 h-[80vh]">
      <View className="flex flex-row w-full mt-5 items-center mb-4 space-x-4">
        <Text className="flex-grow text-Tertiary font-semibold text-2xl">
          {title}s
        </Text>
        {title !== "Order" && (
          <TouchableOpacity
            onPress={() => setAddModalVisible(!AddModalVisible)}
          >
            <ColoredIcon
              iconName={icons.plus}
              customStyle="w-10 h-10"
              resizeMode={"contain"}
            />
          </TouchableOpacity>
        )}
      </View>
      <FlatList
        data={data}
        keyExtractort={(item) => item.id}
        className="w-full flex flex-col space-y-4 mb-10"
        renderItem={({ item }) => (
          <SelectableListItem
            title={title}
            item={item}
            setId={setId}
            setListItemPressed={setListItemPressed}
          />
        )}
      />
    </View>
  );
};

export default SelectableList;
