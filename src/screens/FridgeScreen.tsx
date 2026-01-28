// screens/FridgeScreen.tsx
import { useState, useCallback } from "react"; // Ajout de useCallback
import { View, Text, FlatList, Pressable, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native"; // Important pour rafraîchir la liste
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { RootStackParamList } from "../types";

type FridgeScreenProps = NativeStackScreenProps<RootStackParamList, "Fridge">;

// 1. Correction de l'interface : MongoDB utilise _id
interface FridgeItem {
  _id: string; 
  ingredient: { label: string };
  quantity: number;
  expiresAt: string;
}

export default function FridgeScreen({ navigation }: FridgeScreenProps) {
  const [items, setItems] = useState<FridgeItem[]>([]);
  const [loading, setLoading] = useState(true);

  // 2. Utilisation de useFocusEffect au lieu de useEffect
  // Cela permet de recharger le frigo à chaque fois qu'on revient sur cet écran
  useFocusEffect(
    useCallback(() => {
      async function fetchFridge() {
        try {
          setLoading(true);
          const token = await AsyncStorage.getItem('token');
          console.log(token)
          const res = await axios.get("http://192.168.1.17:5000/fridge", {
            headers: { Authorization: `Bearer ${token}` },
          });
          console.log("coucou")
          // 3. CORRECTION MAJEURE : res.data est déjà le tableau (selon ton controller)
          // On ajoute une sécurité pour vérifier que c'est bien un tableau
          const data = Array.isArray(res.data) ? res.data : [];

          // Trie par date de péremption
          const sortedItems = data.sort(
            (a: FridgeItem, b: FridgeItem) =>
              new Date(a.expiresAt).getTime() - new Date(b.expiresAt).getTime()
          );

          setItems(sortedItems);
        } catch (error) {
          console.error("Erreur récupération frigo :", error);
        } finally {
          setLoading(false);
        }
      }

      fetchFridge();
    }, [])
  );

  return (
    <SafeAreaView className="flex-1 bg-[#2d7a3e]">
      <View className="flex-1 bg-white p-4">
        <Text className="text-2xl font-bold mb-4">Mon Frigo</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#2d7a3e" />
        ) : (
          <FlatList
            data={items}
            // 4. Correction de la clé : _id
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <View className="flex-row justify-between py-3 border-b border-gray-200">
                <Text className="text-base text-gray-800">
                  {/* Sécurité : on vérifie que ingredient existe */}
                  {item.ingredient?.label || "Ingrédient inconnu"}
                </Text>
                <Text className="text-sm text-gray-500">
                  {item.expiresAt ? new Date(item.expiresAt).toLocaleDateString() : "Pas de date"}
                </Text>
              </View>
            )}
            ListEmptyComponent={
              <Text className="text-gray-400 text-center mt-8">
                Votre frigo est vide 😢
              </Text>
            }
          />
        )}

        {/* Boutons de navigation */}
        <View className="mt-6 flex-row justify-around">
          <Pressable
            className="px-6 py-3 bg-[#2d7a3e] rounded-2xl"
            onPress={() => navigation.navigate("Home")}
          >
            <Text className="text-white font-semibold">Accueil</Text>
          </Pressable>

          <Pressable
            className="px-6 py-3 bg-[#2d7a3e] rounded-2xl"
            onPress={() => navigation.navigate("AddFreshIngredients")}
          >
            <Text className="text-white font-semibold">Ajouter</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}