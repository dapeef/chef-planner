import { Module } from '@nestjs/common';
import { UnitController } from './unit.controller';
import { UnitService } from './unit.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recipe } from '../recipe/recipe.entity';
import { RecipeIngredient } from '../recipe-ingredient/recipe-ingredient.entity';
import { Ingredient } from '../ingredient/ingredient.entity';
import { Unit } from './unit.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Recipe, RecipeIngredient, Ingredient, Unit])],
    controllers: [UnitController],
    providers: [UnitService],
})
export class UnitModule {
}
