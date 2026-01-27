import { View, Text, Pressable } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { Ingredient } from '../utils/ingredientMapping';

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
  const [step, setStep] = useState<'confirm' | 'date'>('confirm');

  const defaultDate = new Date();
  defaultDate.setDate(defaultDate.getDate() + defaultDays);

  const [date, setDate] = useState(defaultDate);

  return (
    <View className="absolute bg-black/40 justify-center items-center">
      <View className="bg-white flex-1 w-11/12 rounded-2xl justify-center items-center p-5 gap-4">

        {/* STEP 1 — Confirmation */}
        {step === 'confirm' && (
          <>
            <Text className="text-lg font-semibold text-center">
              Ajouter {ingredient.label} au frigo ?
            </Text>

            <View className="flex-row gap-3 mt-4">
              <Pressable
                onPress={onCancel}
                className="flex-1 py-3 rounded-xl bg-gray-200 items-center"
              >
                <Text>Annuler</Text>
              </Pressable>

              <Pressable
                onPress={() => setStep('date')}
                className="flex-1 py-3 rounded-xl bg-[#2d7a3e] items-center"
              >
                <Text className="text-white font-semibold">
                  Ajouter
                </Text>
              </Pressable>
            </View>
          </>
        )}

        {/* STEP 2 — Date picker */}
        {step === 'date' && (
          <>
            <Text className="text-lg font-semibold text-center">
              Date de péremption
            </Text>

            <DateTimePicker
              value={date}
              mode="date"
              display="spinner"
              onChange={(_, selectedDate) => {
                if (selectedDate) setDate(selectedDate);
              }}
            />

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
                  Confirmer
                </Text>
              </Pressable>
            </View>
          </>
        )}

      </View>
    </View>
  );
}
