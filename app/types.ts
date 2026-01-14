export type RootStackParamList = {
  Home: undefined;
  SelectFood: undefined;
  Recipes: {
    ingredients: string[];
  };
  RecipeDetail: {
    recipeId: string;
  };
};
