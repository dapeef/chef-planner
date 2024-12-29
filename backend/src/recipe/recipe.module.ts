import { Module } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { RecipeController } from './recipe.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recipe } from './recipe.entity';
import { RecipeIngredientService } from '../recipe-ingredient/recipe-ingredient.service';
import { RecipeIngredient } from '../recipe-ingredient/recipe-ingredient.entity';
import { Ingredient } from '../ingredient/ingredient.entity';
import { IngredientService } from '../ingredient/ingredient.service';
import { UnitService } from '../unit/unit.service';
import { Unit } from '../unit/unit.entity';

@Module({
    imports: [TypeOrmModule.forFeature([
        Recipe,
        RecipeIngredient,
        Ingredient,
        Unit,
    ])],
    providers: [
        RecipeService,
        RecipeIngredientService,
        IngredientService,
        UnitService,
    ],
    controllers: [RecipeController],
})
export class RecipeModule {
}
