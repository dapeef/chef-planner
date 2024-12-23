import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ingredient } from './ingredient.entity';
import { AlreadyExistsException } from '../exceptions/exceptions';

@Injectable()
export class IngredientService {
    constructor(
        @InjectRepository(Ingredient)
        private readonly ingredientRepository: Repository<Ingredient>,
    ) {}

    // Create a new ingredient
    async create(ingredientData: Partial<Ingredient>): Promise<Ingredient> {
        try {
            const ingredient = this.ingredientRepository.create(ingredientData);
            return await this.ingredientRepository.save(ingredient);
        } catch (error) {
            if (error.code === '23505') {
                throw new AlreadyExistsException(`Ingredient with name "${ingredientData.name}" already exists`);
            } else {
                throw error;
            }
        }
    }

    async softCreate(ingredientData: Partial<Ingredient>): Promise<Ingredient> {
        const existingIngredient = await this.findByName(ingredientData.name);
        if (!existingIngredient) {
            return this.create(ingredientData);
        } else {
            return existingIngredient;
        }
    }

    async findAll(): Promise<Ingredient[]> {
        return await this.ingredientRepository.find();
    }

    async findById(id: string): Promise<Ingredient> {
        return await this.ingredientRepository.findOneBy({id: id});
    }

    async findByName(name: string): Promise<Ingredient> {
        return await this.ingredientRepository.findOneBy({name: name});
    }
}
