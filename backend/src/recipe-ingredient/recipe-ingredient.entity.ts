import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Recipe } from '../recipe/recipe.entity';
import { Ingredient } from '../ingredient/ingredient.entity';

// RecipeIngredient Entity (Join Table for Recipes and Ingredients)
@Entity('recipe_ingredients')
export class RecipeIngredient {
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @ManyToOne(() => Recipe, (recipe) => recipe.recipeIngredients)
    recipe?: Recipe;

    @ManyToOne(() => Ingredient, (ingredient) => ingredient.recipeIngredients)
    ingredient: Ingredient;

    @Column('float')
    quantity: number;

    @Column()
    units?: string; // e.g., "grams", "cups", "tablespoons"
}
