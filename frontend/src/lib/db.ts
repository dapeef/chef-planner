// src/lib/db.ts
import type { Ingredient, Recipe, Unit } from './types';
import React from 'react';
import { toast } from '@/hooks/use-toast';

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

export async function getAllUnits(): Promise<Unit[]> {
    const apiUrl = 'http://localhost:3000/unit/all';

    const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error(`Error while getting all units: ${response.statusText}`);
    }

    return await response.json();
}

export async function getAllUnitStrings(): Promise<string[]> {
    const units = await getAllUnits();

    return units.map(unit => unit.name);
}

export async function fetchIngredientStrings(
    setAvailableIngredients: (value: React.SetStateAction<string[]>) => void,
    setAvailableUnits: (value: React.SetStateAction<string[]>) => void,
) {
    try {
        const ingredients = await getAllIngredientStrings();
        setAvailableIngredients(ingredients);

        const units = await getAllUnitStrings();
        setAvailableUnits(units);
    } catch (error) {
        console.error('Error fetching ingredients:', error);
        toast({
            title: 'Error',
            description: 'Failed to fetch ingredients. Please check your internet connection.',
            variant: 'destructive',
        });
    }
}