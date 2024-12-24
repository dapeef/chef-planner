import type { Recipe } from '@/lib/types';
import RecipeCard from './RecipeCard';

interface RecipeGridProps {
    recipes: Recipe[];
}

const RecipeGrid = ({recipes}: RecipeGridProps) => {
    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe}/>
            ))}
        </div>
    );
};

export default RecipeGrid;