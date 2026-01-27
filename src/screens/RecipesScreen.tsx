import { View, Text, Pressable, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { useEffect, useState } from "react";

type SelectFoodScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "SelectFood">;

interface SelectFoodScreenProps {
  navigation: SelectFoodScreenNavigationProp;
}

const alimentList = ["tomate","oeuf","jambon"]



export default function RecipesScreen({ navigation }: SelectFoodScreenProps) {
  
  const [allRecipes, setAllRecipes] = useState<string[]>([])

  const fetchRecipes = async (ingredientsArray: string[]) => {
  const API_KEY = "39914c5c46e44ed8a0f679dd503cb32b";
  
  // On transforme ["tomate", "œuf", "jambon"] en "tomate,œuf,jambon"
  const ingredientsString = ingredientsArray.join(',');

  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientsString}&number=10&ranking=1&apiKey=${API_KEY}`
    );
    const recipes = await response.json();
    setAllRecipes(recipes)
    return recipes; // Retourne un tableau de recettes
  } catch (error) {
    console.error("Erreur Spoonacular:", error);
  }
};

   useEffect(() => {
      fetchRecipes(alimentList);
    }, []);

    console.log(allRecipes.length)
  const imageRecipes = allRecipes.map((data:any, i) => {
  return (
    <View key={data.id || i} className="p-2"> 
      <Image 
        source={{ uri: data.image }} 
        className="w-40 h-40 rounded-lg"
        resizeMode="cover"
      />
      <Text className="mt-2 font-bold text-center w-40">{data.title}</Text>
    </View>
  );
});
 return (
  <SafeAreaView className="flex-1 bg-[#2d7a3e]">
    {/* On retire h-screen de la vue intérieure pour laisser le contenu grandir */}
    <ScrollView 
      className="flex-1 bg-white"
      contentContainerStyle={{ alignItems: 'center', paddingVertical: 20 }}
    >
      <View className="flex-row flex-wrap justify-center gap-4">
        {imageRecipes}
      </View>
    </ScrollView>
  </SafeAreaView>
);
}
