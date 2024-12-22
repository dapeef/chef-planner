import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { RecipeIngredient } from '../recipe-ingredient/recipe-ingredient.entity';

// Recipe Entity
@Entity('recipes')
export class Recipe {
    @PrimaryGeneratedColumn('uuid')
    id: number;

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