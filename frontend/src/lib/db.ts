// src/lib/db.ts
import type { Recipe } from './types';

export async function getRecipes(): Promise<Recipe[]> {
    // This is example data - replace with your actual database query
    const recipes: Recipe[] = [
        {
            id: '1',
            title: 'Spaghetti Carbonara',
            description: 'Classic Italian pasta dish with eggs, cheese, pancetta, and pepper. A creamy and delicious meal that can be made in under 30 minutes.',
            cookingTime: 30,
            servings: 4,
            // Either provide a real image URL or remove the imageUrl property
            imageUrl: 'https://picsum.photos/500/300',
        },
        {
            id: '2',
            title: 'Chicken Stir Fry',
            description: 'Quick and healthy stir-fried chicken with colorful vegetables in a savory sauce. Perfect for busy weeknight dinners.',
            cookingTime: 25,
            servings: 3,
            imageUrl: 'https://picsum.photos/500/300',
        },
        {
            id: '3',
            title: 'Vegetable Curry',
            description: 'Aromatic Indian-style curry packed with fresh vegetables and warming spices. A hearty vegetarian meal that\'s full of flavor.',
            cookingTime: 45,
            servings: 4,
            imageUrl: 'https://picsum.photos/500/300',
        },
    ];

    return recipes;
}

export async function getRecipe(id: string): Promise<Recipe | null> {
    const recipes = await getRecipes();
    return recipes.find(recipe => recipe.id === id) || null;
}