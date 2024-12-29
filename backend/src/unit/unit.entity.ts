import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Unique } from 'typeorm';
import { RecipeIngredient } from '../recipe-ingredient/recipe-ingredient.entity';

@Entity('units')
@Unique(['name'])
export class Unit {
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column()
    name: string;

    @OneToMany(() => RecipeIngredient, (recipeIngredient) => recipeIngredient.recipe, {cascade: true})
    recipeIngredients?: RecipeIngredient[];
}
