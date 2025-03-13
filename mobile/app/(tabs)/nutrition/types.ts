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
