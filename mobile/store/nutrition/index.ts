import type { Meal } from '@app/(tabs)/nutrition/types';
import { create } from 'zustand';

// Mock data for meals
const mockMeals: Meal[] = [
  {
    id: '1',
    name: 'Protein-Packed Breakfast Bowl',
    imageUrl:
      'https://images.unsplash.com/photo-1494390248081-4e521a5940db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    prepTime: '15 min',
    servingSize: '1 bowl',
    calories: 450,
    protein: 30,
    carbs: 45,
    fat: 15,
    ingredients: [
      { name: 'Greek Yogurt', quantity: '1 cup' },
      { name: 'Granola', quantity: '1/4 cup' },
      { name: 'Berries', quantity: '1/2 cup', notes: 'Fresh or frozen' },
      { name: 'Honey', quantity: '1 tbsp' },
      { name: 'Chia Seeds', quantity: '1 tsp' }
    ],
    instructions: [
      'Add Greek yogurt to a bowl',
      'Top with granola and berries',
      'Drizzle with honey',
      'Sprinkle chia seeds on top',
      'Enjoy immediately'
    ],
    tips: 'For extra protein, add a scoop of protein powder to the yogurt'
  },
  {
    id: '2',
    name: 'Grilled Chicken Salad',
    imageUrl:
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    prepTime: '25 min',
    servingSize: '1 large salad',
    calories: 380,
    protein: 35,
    carbs: 20,
    fat: 18,
    ingredients: [
      { name: 'Chicken Breast', quantity: '6 oz', notes: 'Boneless, skinless' },
      { name: 'Mixed Greens', quantity: '3 cups' },
      { name: 'Cherry Tomatoes', quantity: '1/2 cup', notes: 'Halved' },
      { name: 'Cucumber', quantity: '1/2', notes: 'Sliced' },
      { name: 'Avocado', quantity: '1/2', notes: 'Diced' },
      { name: 'Olive Oil', quantity: '1 tbsp' },
      { name: 'Lemon Juice', quantity: '1 tbsp' }
    ],
    instructions: [
      'Season chicken breast with salt and pepper',
      'Grill chicken for 6-7 minutes per side until cooked through',
      'Let chicken rest for 5 minutes, then slice',
      'Combine mixed greens, tomatoes, cucumber, and avocado in a bowl',
      'Top with sliced chicken',
      'Drizzle with olive oil and lemon juice',
      'Season with salt and pepper to taste'
    ]
  },
  {
    id: '3',
    name: 'Protein Smoothie',
    imageUrl:
      'https://images.unsplash.com/photo-1502741224143-90386d7f8c82?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    prepTime: '5 min',
    servingSize: '1 large glass',
    calories: 320,
    protein: 25,
    carbs: 30,
    fat: 10,
    ingredients: [
      { name: 'Protein Powder', quantity: '1 scoop' },
      { name: 'Banana', quantity: '1 medium' },
      { name: 'Almond Milk', quantity: '1 cup' },
      { name: 'Peanut Butter', quantity: '1 tbsp' },
      { name: 'Ice Cubes', quantity: '1/2 cup' }
    ],
    instructions: [
      'Add all ingredients to a blender',
      'Blend until smooth',
      'Pour into a glass and serve immediately'
    ],
    tips: 'Add a handful of spinach for extra nutrients without affecting the taste'
  }
];

interface NutritionState {
  meals: Meal[];
  isLoading: boolean;
  error: string | null;
  fetchMeals: () => Promise<void>;
  getMealById: (id: string) => Meal | undefined;
}

export const useNutritionStore = create<NutritionState>((set, get) => ({
  meals: [],
  isLoading: false,
  error: null,
  fetchMeals: async () => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call with a delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      set({ meals: mockMeals, isLoading: false });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_error) {
      set({ error: 'Failed to fetch meals', isLoading: false });
    }
  },
  getMealById: (id: string) => {
    return get().meals.find((meal) => meal.id === id);
  }
}));
