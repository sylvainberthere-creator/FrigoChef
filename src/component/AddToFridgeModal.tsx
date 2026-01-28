import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Modal, Pressable, Text, View } from "react-native";
import { Ingredient } from "../utils/ingredientMapping";

interface Props {
  ingredient: Ingredient;
  defaultDays: number;
  onCancel: () => void;
  onConfirm: (date: Date) => void;
}

export function AddToFridgeModal({
  ingredient,
  defaultDays,
  onCancel,
  onConfirm,
}: Props) {
  const defaultDate = new Date();
  defaultDate.setDate(defaultDate.getDate() + defaultDays);

  const [date, setDate] = useState<Date>(defaultDate);
  const [showPicker, setShowPicker] = useState(false);

  return (
    <Modal transparent animationType="fade">
      <View className="flex-1 bg-black/40 justify-center items-center">
        <View className="bg-white w-11/12 rounded-2xl p-5 gap-4">

          {/* Title */}
          <Text className="text-lg font-semibold text-center">
            Ajouter {ingredient.label}
          </Text>

          {/* Expiration date */}
          <View className="items-center">
            <Text className="text-gray-600">
              Date de péremption estimée
            </Text>
            <Text className="text-base font-medium mt-1">
              {date.toLocaleDateString("fr-FR")}
            </Text>

            <Pressable
              onPress={() => setShowPicker(true)}
              className="mt-2"
            >
              <Text className="text-[#2d7a3e] font-semibold">
                Modifier la date
              </Text>
            </Pressable>
          </View>

          {/* Date picker (conditional) */}
          {showPicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="spinner"
              onChange={(_, selectedDate) => {
                if (selectedDate) {
                  setDate(selectedDate);
                  setShowPicker(false);
                }
              }}
            />
          )}

          {/* Actions */}
          <View className="flex-row gap-3 mt-4">
            <Pressable
              onPress={onCancel}
              className="flex-1 py-3 rounded-xl bg-gray-200 items-center"
            >
              <Text>Annuler</Text>
            </Pressable>

            <Pressable
              onPress={() => onConfirm(date)}
              className="flex-1 py-3 rounded-xl bg-[#2d7a3e] items-center"
            >
              <Text className="text-white font-semibold">
                Ajouter au frigo
              </Text>
            </Pressable>
          </View>

        </View>
      </View>
    </Modal>
  );
}
