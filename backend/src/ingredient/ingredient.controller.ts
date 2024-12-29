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
        return await this.ingredientService.softCreate(ingredient);
    }

    @Get()
    async findBy(@Body('id') id?: string, @Body('name') name?: string): Promise<Ingredient> {
        if (id) {
            return await this.ingredientService.findById(id);
        } else if (name) {
            return await this.ingredientService.findByName(name);
        } else {
            throw Error('No parameter specified. Try specifying with `id` or `name`');
        }
    }

    @Get('all')
    async findAll(): Promise<Ingredient[]> {
        return await this.ingredientService.findAll();
    }
}
