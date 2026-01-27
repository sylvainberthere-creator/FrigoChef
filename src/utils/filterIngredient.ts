import { Ingredient, IngredientCategory } from "./ingredientMapping";

export function filterFreshIngredients(
  ingredients: Ingredient[],
  query: string,
  category?: IngredientCategory
): Ingredient[] {
  if (!query.trim() && !category) return ingredients;

  const normalizedQuery = query.toLowerCase().trim();

  return ingredients.filter(ingredient => {
    const matchesCategory = category
      ? ingredient.category === category
      : true;

    const matchesText =
      ingredient.label.toLowerCase().includes(normalizedQuery) ||
      ingredient.value.toLowerCase().includes(normalizedQuery) ||
      ingredient.aliases.some(alias =>
        alias.toLowerCase().includes(normalizedQuery)
      );

    return matchesCategory && matchesText;
  });
}
