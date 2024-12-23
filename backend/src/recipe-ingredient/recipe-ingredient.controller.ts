import { Body, Controller, Post } from '@nestjs/common';
import { RecipeIngredientService } from './recipe-ingredient.service';
import { RecipeIngredient, RecipeIngredientCreator } from './recipe-ingredient.entity';

@Controller('recipe-ingredient')
export class RecipeIngredientController {
    constructor(
        private recipeIngredientService: RecipeIngredientService,
    ) {}

    @Post()
    async create(@Body() recipeIngredient: RecipeIngredientCreator) {
        return await this.recipeIngredientService.create(recipeIngredient);
    }
}
