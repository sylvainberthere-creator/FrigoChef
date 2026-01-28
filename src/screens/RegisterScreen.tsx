import { useState } from "react";
import { View, Text, TextInput, Pressable, Alert } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";

type Props = NativeStackScreenProps<RootStackParamList, "Register">;

export default function RegisterScreen({ navigation }: Props) {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister() {
    if (!firstName || !email || !password) {
      return Alert.alert("Erreur", "Tous les champs sont requis.");
    }

    setLoading(true);
    try {
      const res = await axios.post("http://192.168.1.17:5000/auth/register", {
        firstName,
        email,
        password,
      });

      const { token } = res.data;
      await AsyncStorage.setItem("token", token);

      // Redirige vers le frigo
      navigation.replace("Fridge");
    } catch (err: any) {
      console.error(err);
      Alert.alert("Erreur", err.response?.data?.error || "Erreur serveur");
    } finally {
      setLoading(false);
    }
  }

  return (
    <View className="flex-1 bg-white px-6 justify-center">
      <Text className="text-2xl font-bold mb-6 text-center">Inscription</Text>

      <TextInput
        placeholder="Prénom"
        value={firstName}
        onChangeText={setFirstName}
        className="border border-gray-300 rounded-xl px-4 py-3 mb-4"
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        className="border border-gray-300 rounded-xl px-4 py-3 mb-4"
      />
      <TextInput
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        className="border border-gray-300 rounded-xl px-4 py-3 mb-6"
      />

      <Pressable
        onPress={handleRegister}
        className="w-full py-4 rounded-2xl bg-[#2d7a3e] items-center active:scale-95"
        disabled={loading}
      >
        <Text className="text-white font-semibold text-base">
          {loading ? "Inscription..." : "S'inscrire"}
        </Text>
      </Pressable>

      <Pressable onPress={() => navigation.navigate("Login")} className="mt-4 items-center">
        <Text className="text-green-700 font-medium">J'ai déjà un compte</Text>
      </Pressable>
    </View>
  );
}
