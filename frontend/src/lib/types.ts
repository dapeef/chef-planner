export interface Recipe {
    id?: string;
    title: string;
    description: string;
    preparationTime: number; // in minutes
    cookingTime: number; // in minutes
    servings: number;
    recipeIngredients: RecipeIngredient[];
    imageUrl?: string | undefined;
}

export interface Ingredient {
    id?: string;
    name: string;
    recipeIngredients?: RecipeIngredient[];
}

export interface RecipeIngredient {
    id?: string;
    recipe?: Recipe;
    ingredient: Ingredient;
    quantity: number;
    units: string; // e.g., "grams", "cups", "tablespoons"
}