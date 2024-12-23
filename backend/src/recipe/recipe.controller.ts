import { Body, Controller, Post } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { Recipe } from './recipe.entity';

@Controller('recipe')
export class RecipeController {
    constructor(
        private recipeService: RecipeService,
    ) {}

    @Post()
    async create(@Body() recipe: Partial<Recipe>) {
        return await this.recipeService.create(recipe);
    }
}
