// src/lib/db.ts
import type { Ingredient, Recipe } from './types';

export async function getAllRecipes(): Promise<Recipe[]> {
    const apiUrl = 'http://localhost:3000/recipe/all';

    const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error(`Error while getting all recipes: ${response.statusText}`);
    }

    return await response.json();
}

export async function createRecipe(recipe: Recipe) {
    const apiUrl = 'http://localhost:3000/recipe';

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipe),
    });

    if (!response.ok) {
        throw new Error(`Error while creating recipe: ${response.statusText}`);
    }

    return await response.json();
}

export async function getAllIngredients(): Promise<Ingredient[]> {
    const apiUrl = 'http://localhost:3000/ingredient/all';

    const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error(`Error while getting all ingredients: ${response.statusText}`);
    }

    return await response.json();
}

export async function getAllIngredientStrings(): Promise<string[]> {
    const ingredients = await getAllIngredients();

    return ingredients.map(ingredient => ingredient.name);
}