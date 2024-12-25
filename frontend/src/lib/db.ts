// src/lib/db.ts
import type { Recipe } from './types';

export async function getRecipes(): Promise<Recipe[]> {
    const apiUrl = 'http://localhost:3000/recipe/all';

    const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        // body: JSON.stringify({
        //     id: '1234', // Replace with your dynamic value if needed
        // }),
    });

    console.log(response);

    if (!response.ok) {
        throw new Error(`Error while getting all recipes: ${response.statusText}`);
    }

    return await response.json();
}