import RecipeGrid from '@/components/RecipeGrid';
import { getRecipes } from '@/lib/db';

export default async function RecipesPage() {
    const recipes = await getRecipes();

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">All Recipes</h1>
            <RecipeGrid recipes={recipes}/>
        </div>
    );
}