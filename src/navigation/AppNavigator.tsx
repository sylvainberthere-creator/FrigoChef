import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import SelectFoodScreen from "../screens/SelectFoodScreen";
import RecipesScreen from "../screens/RecipesScreen";
import type { RootStackParamList } from "../types";
import AddFreshIngredientsScreen from "../screens/AddFreshIngredientsScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="SelectFood" component={SelectFoodScreen} />
        <Stack.Screen name="Recipes" component={RecipesScreen} />
        <Stack.Screen name="AddFreshIngredients" component={AddFreshIngredientsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
