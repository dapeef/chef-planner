import { Body, Controller, Get, Post } from '@nestjs/common';
import { Ingredient } from './ingredient.entity';
import { IngredientService } from './ingredient.service';

@Controller('ingredient')
export class IngredientController {
    constructor(
        private ingredientService: IngredientService,
    ) {}

    @Post()
    async create(@Body() ingredient: Partial<Ingredient>) {
        return await this.ingredientService.create(ingredient);
    }

    @Get()
    async findById(@Body('id') id: string): Promise<Ingredient> {
        return await this.ingredientService.findById(id);
    }

    @Get('all')
    async findAll(): Promise<Ingredient[]> {
        return await this.ingredientService.findAll();
    }
}
