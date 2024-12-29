import { Body, Controller, Get, Post } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { Recipe } from './recipe.entity';

@Controller('recipe')
export class RecipeController {
    constructor(
        private recipeService: RecipeService,
    ) {}

    @Post()
    async create(@Body() recipeData: Recipe) {
        return await this.recipeService.create(recipeData);
    }

    @Get()
    async findById(@Body('id') id: string): Promise<Recipe> {
        return await this.recipeService.findById(id);
    }

    @Get('all')
    async findAll(): Promise<Recipe[]> {
        console.log('Getting all recipes');
        return await this.recipeService.findAll();
    }
}
