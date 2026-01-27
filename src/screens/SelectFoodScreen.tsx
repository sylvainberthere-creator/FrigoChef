import { View, Text, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import alimentCard from "../component/alimentCard";
import selectAliment from "../component/selectAliment";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { useEffect, useState } from "react";
import { CameraView, Camera } from "expo-camera";


type SelectFoodScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "SelectFood">;

interface SelectFoodScreenProps {
  navigation: SelectFoodScreenNavigationProp;
}



export default function SelectFoodScreen({ navigation }: SelectFoodScreenProps) {
  const alimentList = ["fraise", "banane", "courgette"];

  const [alimentToSelect, setAlimentToSelect] = useState<string[]>([]);
  const [alimentSelected, setAlimentSelected] = useState<string[]>([]);
  const [hasPermission, setHasPermission] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [productName, setProductName] = useState("");

  const handleSelect = (name: string) => {
    setAlimentSelected((prev) => [...prev, name]);
    setAlimentToSelect((prev) => prev.filter((item) => item !== name));
  };

  const handleDeselect = (name: string) => {
    setAlimentToSelect((prev) => [...prev, name]);
    setAlimentSelected((prev) => prev.filter((item) => item !== name));
  };

  useEffect(() => {
    setAlimentToSelect(alimentList);
  }, []);

  useEffect(() => {
    (async () => {
      const result = await Camera.requestCameraPermissionsAsync();
      setHasPermission(result && result?.status === "granted");
    })();
  }, []);


  function extractAllIngredients(product: any): string[] {
  const ingredients = new Set<string>();



  return Array.from(ingredients);
}

  const fetchProductDetails = async (barcode: string) => {
    try {
      const response = await fetch(
        `https://world.openfoodfacts.org/api/v2/product/${barcode}.json`
      );
      const data = await response.json();

      if (data.status === 1) {
        setProductName(data.product.product_name || "Produit inconnu");
        console.log(barcode);
      } else {
        setProductName("Produit non trouvé");
      }
      extractAllIngredients(data.product)
      console.log(extractAllIngredients(data.product))
    } catch (error) {
      console.error("Erreur API:", error);
    }
  };

  if (!hasPermission) {
    return <View />;
  }

  const choiceAliment = alimentToSelect.map((data, i) => {
    return selectAliment(data, handleSelect);
  });

  const alimentSelect = alimentSelected.map((data, i) => {
    return alimentCard(data, handleDeselect);
  });

  const resetAliment = () => {
    setScanned(false);
    setProductName("");
  };

  return (
    <SafeAreaView className="flex-1 bg-[#2d7a3e]">
  <ScrollView
    className="flex-1 bg-white"
    contentContainerStyle={{ paddingVertical: 20}}
    showsVerticalScrollIndicator={false}
  >
    <View className="pl-1 pr-1 gap-6">

      {/* Camera */}
      <View className="w-screen h-72">
        <CameraView
          style={{ flex: 1 }}
          onBarcodeScanned={
            scanned
              ? undefined
              : ({ data }) => {
                  setScanned(true);
                  fetchProductDetails(data);
                }
          }
        />
      </View>

      {/* Title */}
      <Text className="text-xl font-bold border-b pb-2">
        Sélection des aliments
      </Text>

      {/* Choix aliments */}
      <View>{choiceAliment}</View>

      <View>{alimentSelect}</View>

      {/* Product name */}
      <View className="bg-gray-600 rounded-lg p-3">
        <Text className="text-white text-center">
          {productName}
        </Text>
      </View>

      {/* Buttons */}
      <Pressable
        onPress={resetAliment}
        className="rounded-2xl bg-[#2d7a3e] py-4 items-center"
      >
        <Text className="text-white font-semibold">
          Nouveau Scan
        </Text>
      </Pressable>

      <Pressable
        onPress={() => navigation.navigate("Recipes")}
        className="rounded-2xl bg-[#2d7a3e] py-4 items-center"
      >
        <Text className="text-white font-semibold">
          Voir les recettes
        </Text>
      </Pressable>

      <Pressable
        onPress={() => navigation.navigate("AddFreshIngredients")}
        className="rounded-2xl bg-[#2d7a3e] py-4 items-center"
      >
        <Text className="text-white font-semibold">
          Sélection aliment
        </Text>
      </Pressable>

    </View>
  </ScrollView>
</SafeAreaView>
)}