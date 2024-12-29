import { Module } from '@nestjs/common';
import { RecipeIngredientService } from './recipe-ingredient.service';
import { RecipeIngredientController } from './recipe-ingredient.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeIngredient } from './recipe-ingredient.entity';
import { IngredientService } from '../ingredient/ingredient.service';
import { Recipe } from '../recipe/recipe.entity';
import { Ingredient } from '../ingredient/ingredient.entity';
import { UnitService } from '../unit/unit.service';
import { Unit } from '../unit/unit.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Recipe, RecipeIngredient, Ingredient, Unit])],
    providers: [
        RecipeIngredientService,
        IngredientService,
        UnitService,
    ],
    controllers: [RecipeIngredientController],
})
export class RecipeIngredientModule {
}
