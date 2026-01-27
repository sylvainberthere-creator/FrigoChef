import { Text, Pressable } from "react-native";

export default function selectAliment(name: string, handleSelect:any) {


  return (
    <Pressable
      key={name} // Important pour les listes
      onPress={() => handleSelect(name)}
      className="flex-row items-center justify-center bg-white"
    >
      <Text className="text-xl font-bold text-green-900">{name}</Text>
    </Pressable>
  )
}
