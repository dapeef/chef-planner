import { Body, Controller, Get, Post } from '@nestjs/common';
import { RecipeIngredientService } from './recipe-ingredient.service';
import { RecipeIngredient } from './recipe-ingredient.entity';

@Controller('recipe-ingredient')
export class RecipeIngredientController {
    constructor(
        private recipeIngredientService: RecipeIngredientService,
    ) {}

    @Post()
    async create(@Body() recipeIngredientData: RecipeIngredient) {
        return await this.recipeIngredientService.create(recipeIngredientData);
    }

    @Get()
    async findById(@Body('id') id: string): Promise<RecipeIngredient> {
        return await this.recipeIngredientService.findById(id);
    }

    @Get('all')
    async findAll(): Promise<RecipeIngredient[]> {
        return await this.recipeIngredientService.findAll();
    }
}
