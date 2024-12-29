import RecipeGrid from '@/components/RecipeGrid';
import { getAllRecipes } from '@/lib/db';

export default async function RecipesPage() {
    const recipes = await getAllRecipes();

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">All Recipes</h1>
            <RecipeGrid recipes={recipes}/>
        </div>
    );
}