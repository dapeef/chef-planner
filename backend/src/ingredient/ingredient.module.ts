import { Module } from '@nestjs/common';
import { RecipeService } from '../recipe/recipe.service';
import { IngredientService } from './ingredient.service';
import { IngredientController } from './ingredient.controller';
import { Recipe } from '../recipe/recipe.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ingredient } from './ingredient.entity';
import { RecipeIngredient } from '../recipe-ingredient/recipe-ingredient.entity';
import { RecipeIngredientService } from '../recipe-ingredient/recipe-ingredient.service';
import { UnitService } from '../unit/unit.service';
import { Unit } from '../unit/unit.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Recipe, Ingredient, RecipeIngredient, Unit])],
    providers: [
        RecipeService,
        IngredientService,
        RecipeIngredientService,
        UnitService,
    ],
    controllers: [IngredientController],
})
export class IngredientModule {
}
