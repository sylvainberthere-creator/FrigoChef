import { View, Text, Pressable } from "react-native";
import { ChefHat } from "lucide-react-native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { SafeAreaView } from "react-native-safe-area-context";

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

export default function HomeScreen({ navigation }: HomeScreenProps) {
  return (
    <SafeAreaView className="flex-1 bg-[#2d7a3e]">
      <View className="flex-1 justify-center items-center px-6 bg-white">
        {/* Logo */}
        <View className="relative mb-4">
          <View className="w-24 h-24 border rounded-full bg-[#2d7a3e] items-center justify-center shadow-lg">
            <ChefHat color="white" size={48} strokeWidth={2} />
          </View>
          <View className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-[#d4c5a9] border-4 border-white" />
        </View>

        {/* App Name */}
        <Text className="text-3xl font-bold text-[#2d7a3e]">FrigoChef</Text>

        {/* Tagline */}
        <Text className="text-center text-lg text-gray-800 mb-8">
          Transforme ce qu&apos;il y a dans ton frigo en recettes
        </Text>

        {/* Auth Buttons */}
        <View className="w-full gap-4">
          <Pressable
            onPress={() => navigation.navigate("Register")}
            className="w-full py-4 rounded-2xl bg-[#2d7a3e] items-center active:scale-95"
          >
            <Text className="text-white font-semibold text-base">S'inscrire</Text>
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate("Login")}
            className="w-full py-4 rounded-2xl bg-[#48a35c] items-center active:scale-95"
          >
            <Text className="text-white font-semibold text-base">Se connecter</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
