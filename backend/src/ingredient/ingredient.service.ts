import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ingredient } from './ingredient.entity';

@Injectable()
export class IngredientService {
    constructor(
        @InjectRepository(Ingredient)
        private readonly ingredientRepository: Repository<Ingredient>,
    ) {}

    // Create a new ingredient
    async create(ingredientData: Partial<Ingredient>): Promise<Ingredient> {
        const ingredient = this.ingredientRepository.create(ingredientData);
        return await this.ingredientRepository.save(ingredient);
    }
}
