import { Module } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { RecipeController } from './recipe.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recipe } from './recipe.entity';
import { RecipeIngredientService } from '../recipe-ingredient/recipe-ingredient.service';
import { RecipeIngredient } from '../recipe-ingredient/recipe-ingredient.entity';
import { Ingredient } from '../ingredient/ingredient.entity';
import { IngredientService } from '../ingredient/ingredient.service';

@Module({
    imports: [TypeOrmModule.forFeature([
        Recipe,
        RecipeIngredient,
        Ingredient,
    ])],
    providers: [
        RecipeService,
        RecipeIngredientService,
        IngredientService,
    ],
    controllers: [RecipeController],
})
export class RecipeModule {
}
