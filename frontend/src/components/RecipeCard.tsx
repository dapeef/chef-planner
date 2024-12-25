import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Users } from 'lucide-react';
import Link from 'next/link';
import type { Recipe } from '@/lib/types';

interface RecipeCardProps {
    recipe: Recipe;
}

const RecipeCard = ({recipe}: RecipeCardProps) => {
    return (
        <Link href={`/recipes/${recipe.id}`}>
            <Card className="h-full transition-all hover:shadow-lg">
                {recipe.imageUrl && (
                    <div className="relative w-full h-48 overflow-hidden rounded-t-lg">
                        <img
                            src={recipe.imageUrl}
                            alt={recipe.title}
                            className="object-cover w-full h-full"
                        />
                    </div>
                )}
                <CardHeader>
                    <CardTitle className="text-xl">{recipe.title}</CardTitle>
                    <CardDescription className="line-clamp-2">
                        {recipe.description}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1"/>
                            <span>{recipe.cookingTime} mins</span>
                        </div>
                        <div className="flex items-center">
                            <Users className="w-4 h-4 mr-1"/>
                            <span>{recipe.servings} servings</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
};

export default RecipeCard;