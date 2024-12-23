import { Body, Controller, Get, Post } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { Recipe, RecipeCreator } from './recipe.entity';

@Controller('recipe')
export class RecipeController {
    constructor(
        private recipeService: RecipeService,
    ) {}

    @Post()
    async create(@Body() recipeIngredient: RecipeCreator) {
        return await this.recipeService.create(recipeIngredient);
    }

    @Get()
    async findById(@Body('id') id: string): Promise<Recipe> {
        return await this.recipeService.findById(id);
    }

    @Get('all')
    async findAll(): Promise<Recipe[]> {
        return await this.recipeService.findAll();
    }
}
