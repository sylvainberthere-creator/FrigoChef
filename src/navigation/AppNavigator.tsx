import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import SelectFoodScreen from "../screens/SelectFoodScreen";
import RecipesScreen from "../screens/RecipesScreen";
import type { RootStackParamList } from "../types";
import AddFreshIngredientsScreen from "../screens/AddFreshIngredientsScreen";
import RegisterScreen from "../screens/RegisterScreen";
import LoginScreen from "../screens/LoginScreen";
import FridgeScreen from "../screens/FridgeScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SelectFood" component={SelectFoodScreen} />
        <Stack.Screen name="Fridge" component={FridgeScreen} />
        <Stack.Screen name="Recipes" component={RecipesScreen} />
        <Stack.Screen name="AddFreshIngredients" component={AddFreshIngredientsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
