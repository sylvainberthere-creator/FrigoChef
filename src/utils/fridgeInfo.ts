import { Ingredient, IngredientCategory } from "./ingredientMapping";


export interface FridgeItem {
  id: string;
  ingredient: Ingredient;
  expiresAt: string; // ISO date
  addedAt: string;
}

export const DEFAULT_EXPIRATION_DAYS: Record<IngredientCategory, number> = {
  vegetable: 5,
  fruit: 5,
  meat: 2,
  dairy: 4,
  grain: 180
};
