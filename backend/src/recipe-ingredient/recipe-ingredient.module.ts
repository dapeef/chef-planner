import { Module } from '@nestjs/common';
import { RecipeIngredientService } from './recipe-ingredient.service';
import { RecipeIngredientController } from './recipe-ingredient.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeIngredient } from './recipe-ingredient.entity';
import { IngredientService } from '../ingredient/ingredient.service';
import { Recipe } from '../recipe/recipe.entity';
import { Ingredient } from '../ingredient/ingredient.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Recipe, RecipeIngredient, Ingredient])],
    providers: [
        RecipeIngredientService,
        IngredientService,
    ],
    controllers: [RecipeIngredientController],
})
export class RecipeIngredientModule {
}
