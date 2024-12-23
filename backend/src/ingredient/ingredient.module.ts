import { Module } from '@nestjs/common';
import { RecipeService } from '../recipe/recipe.service';
import { IngredientService } from './ingredient.service';
import { IngredientController } from './ingredient.controller';
import { Recipe } from '../recipe/recipe.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ingredient } from './ingredient.entity';
import { RecipeIngredient } from '../recipe-ingredient/recipe-ingredient.entity';
import { RecipeIngredientService } from '../recipe-ingredient/recipe-ingredient.service';

@Module({
    imports: [TypeOrmModule.forFeature([Recipe, Ingredient, RecipeIngredient])],
    providers: [
        RecipeService,
        IngredientService,
        RecipeIngredientService,
    ],
    controllers: [IngredientController],
})
export class IngredientModule {
}
