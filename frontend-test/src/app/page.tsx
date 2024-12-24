import WelcomeCard from '@/components/WelcomeCard';
import RecipeCard from '@/components/RecipeCard';
import { Recipe } from '@/lib/types';
import RecipeGrid from '@/components/RecipeGrid';
import { getRecipes } from '@/lib/db';

// const recipes: Recipe[] = [
//     {
//         id: '1234',
//         title: 'Carbonara',
//         description: 'A creamy pasta dish',
//         cookingTime: 10,
//         servings: 19,
//     },
//     {
//         id: '12345',
//         title: 'Bolognese',
//         description: 'A tomatoey pasta dish',
//         cookingTime: 15,
//         servings: 1000,
//     },
// ];
const recipes: Recipe[] = await getRecipes();

export default function Home() {
    // return <RecipeCard recipe={recipe}/>;
    return <RecipeGrid recipes={recipes}/>;
}