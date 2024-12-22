import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecipeIngredient } from './recipe-ingredient.entity';

@Injectable()
export class RecipeIngredientService {
    constructor(
        @InjectRepository(RecipeIngredient)
        private readonly recipeIngredientRepository: Repository<RecipeIngredient>,
    ) {}

    // Create a new ingredient
    async create(recipeIngredientData: Partial<RecipeIngredient>): Promise<RecipeIngredient> {
        const ingredient = this.recipeIngredientRepository.create(recipeIngredientData);
        return await this.recipeIngredientRepository.save(ingredient);
    }
}
