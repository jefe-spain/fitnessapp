export interface Ingredient {
  name: string;
  quantity: string;
  notes?: string;
}

export interface Meal {
  id: string;
  name: string;
  imageUrl?: string;
  prepTime: string;
  servingSize: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  ingredients: Ingredient[];
  instructions: string[];
  tips?: string;
}

// This default export is needed to prevent Expo Router from treating this file as a route
export default function NutritionTypes() {
  return null;
}
