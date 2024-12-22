import { Module } from '@nestjs/common';
import { RecipeService } from '../recipe/recipe.service';
import { IngredientService } from './ingredient.service';
import { IngredientController } from './ingredient.controller';
import { Recipe } from '../recipe/recipe.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ingredient } from './ingredient.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Recipe, Ingredient])],
    providers: [RecipeService, IngredientService],
    controllers: [IngredientController],
})
export class IngredientModule {
}
