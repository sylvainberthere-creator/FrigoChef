import { View, Text, Pressable } from "react-native";
import { X } from "lucide-react-native";

export default function alimentCard(name: string, handleDeselect: any) {
  return (
    <View className="flex-row items-center justify-center p-1 border bg-white">
      <Text className="text-xl font-bold">{name}</Text>
      <Pressable key={name} onPress={() => handleDeselect(name)}>
        <X color={"black"} />
      </Pressable>
    </View>
  );
}
