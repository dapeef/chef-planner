import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { RecipeIngredient } from '../recipe-ingredient/recipe-ingredient.entity';

// Recipe Entity
@Entity('recipes')
export class Recipe {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column('text')
    description: string;

    @Column()
    preparationTime: number; // in minutes

    @Column()
    cookingTime: number; // in minutes

    @OneToMany(() => RecipeIngredient, (recipeIngredient) => recipeIngredient.recipe, {cascade: true})
    recipeIngredients: RecipeIngredient[];
}

export interface RecipeCreator {
    title: string;
    description?: string;
    preparationTime: number;
    cookingTime: number;
    recipeIngredientIds: string[];
}