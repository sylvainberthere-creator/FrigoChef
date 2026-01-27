import { useMemo, useState } from "react";
import { FlatList, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AddToFridgeModal } from "../component/AddToFridgeModal";
import { filterFreshIngredients } from "../utils/filterIngredient";
import { DEFAULT_EXPIRATION_DAYS, FridgeItem } from "../utils/fridgeInfo";
import { Ingredient, INGREDIENT_DICTIONARY, IngredientCategory } from "../utils/ingredientMapping";

const CATEGORIES: { label: string; value?: IngredientCategory }[] = [
  { label: "Tous" },
  { label: "🥕 Légumes", value: "vegetable" },
  { label: "🍎 Fruits", value: "fruit" },
  { label: "🥩 Viandes", value: "meat" },
  { label: "🍝 Secs", value: "grain" },
];

export default function AddFreshIngredientsScreen() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<IngredientCategory | undefined>();
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>([]);
  const [ingredientToAdd, setIngredientToAdd] = useState<Ingredient | null>(null);
  const [fridge, setFridge] = useState<FridgeItem[]>([]);

  function onSelectIngredient(ingredient: Ingredient) {
    setIngredientToAdd(ingredient);
  }

  const filteredIngredients = useMemo(
    () => filterFreshIngredients(INGREDIENT_DICTIONARY, query, category),
    [query, category]
  );

  function toggleIngredient(ingredient: Ingredient) {
    setSelectedIngredients((prev) =>
      prev.some((i) => i.value === ingredient.value)
        ? prev.filter((i) => i.value !== ingredient.value)
        : [...prev, ingredient]
    );
  }

  function addToFridge(ingredient: Ingredient, date: Date) {
    setFridge((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        ingredient,
        expiresAt: date.toISOString(),
        addedAt: new Date().toISOString(),
      },
    ]);
  }

  return (
    <SafeAreaView className="flex-1 bg-[#2d7a3e]">
      {/* On retire h-screen de la vue intérieure pour laisser le contenu grandir */}

      <View className="flex-1 bg-white px-4 pt-6">
        {/* Title */}
        <Text className="text-2xl font-semibold mb-4">Ajoute tes ingrédients</Text>

        {/* Input */}
        <TextInput
          placeholder="Ex : courgette, riz, poulet..."
          value={query}
          onChangeText={setQuery}
          className="border border-gray-300 rounded-xl px-4 py-3 mb-4 text-base"
        />

        {/* Categories */}
        <View className="flex-row flex-wrap gap-2 mb-4">
          {CATEGORIES.map((cat) => {
            const active = category === cat.value;

            return (
              <Pressable
                key={cat.label}
                onPress={() => setCategory(cat.value)}
                className={`px-4 py-2 rounded-full ${active ? "bg-green-200" : "bg-gray-200"}`}
              >
                <Text className="text-sm font-medium">{cat.label}</Text>
              </Pressable>
            );
          })}
        </View>

        {/* Ingredients list */}
        <FlatList
          data={filteredIngredients}
          keyExtractor={(item) => item.value}
          keyboardShouldPersistTaps="handled"
          renderItem={({ item }) => {
            const selected = selectedIngredients.some((i) => i.value === item.value);

            return (
              <Pressable
                onPress={() => onSelectIngredient(item)}
                className={`py-4 px-2 border-b border-gray-200 ${selected ? "bg-green-100" : ""}`}
              >
                <Text className="text-base text-gray-800">{item.label}</Text>
              </Pressable>
            );
          }}
        />
        {ingredientToAdd && (
          <AddToFridgeModal
            ingredient={ingredientToAdd}
            defaultDays={DEFAULT_EXPIRATION_DAYS[ingredientToAdd.category]}
            onCancel={() => setIngredientToAdd(null)}
            onConfirm={(date) => {
              addToFridge(ingredientToAdd, date);
              setIngredientToAdd(null);
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
