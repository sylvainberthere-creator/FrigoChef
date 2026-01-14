import { View, Text, Pressable } from 'react-native';
import { ChefHat } from 'lucide-react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type HomeScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList, 'Home'>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

export default function HomeScreen({ navigation }: HomeScreenProps) {
  return (
      <View className="items-center gap-6">

        {/* Logo */}
        <View className="relative mb-4">
          <View className="w-24 h-24 rounded-full bg-[#2d7a3e] items-center justify-center shadow-lg">
            <ChefHat color="white" size={48} strokeWidth={2} />
          </View>

          <View className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-[#d4c5a9] border-4 border-white" />
        </View>

        {/* App Name */}
        <Text className="text-3xl font-bold text-[#2d7a3e]">
          FrigoChef
        </Text>

        {/* Tagline */}
        <Text className="text-center text-lg text-gray-800">
          Transforme ce qu&apos;il y a dans ton frigo en recettes
        </Text>

        {/* CTA Button */}
        <Pressable
          onPress={() => navigation.navigate('SelectFood')}
          className="w-full mt-4 rounded-2xl bg-[#2d7a3e] py-4 items-center active:scale-95"
        >
          <Text className="text-white font-semibold text-base">
            Choisir mes aliments
          </Text>
        </Pressable>

        {/* Decorative dots */}
        <View className="flex-row gap-3 mt-6 opacity-60">
          <View className="w-3 h-3 rounded-full bg-[#2d7a3e]" />
          <View className="w-3 h-3 rounded-full bg-[#d4c5a9]" />
          <View className="w-3 h-3 rounded-full bg-[#2d7a3e]" />
        </View>

      </View>
  );
}
