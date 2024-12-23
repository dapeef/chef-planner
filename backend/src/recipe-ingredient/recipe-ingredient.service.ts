import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecipeIngredient, RecipeIngredientCreator } from './recipe-ingredient.entity';
import { IngredientService } from '../ingredient/ingredient.service';

@Injectable()
export class RecipeIngredientService {
    constructor(
        @InjectRepository(RecipeIngredient)
        private readonly recipeIngredientRepository: Repository<RecipeIngredient>,
        private readonly ingredientService: IngredientService,
    ) {}

    // Create a new ingredient
    async create(recipeIngredientData: RecipeIngredientCreator): Promise<RecipeIngredient> {
        console.log('starting creation');
        const ingredient = await this.ingredientService.findById(recipeIngredientData.ingredientId);

        const partialRecipeIngredient: Partial<RecipeIngredient> = {
            ingredient: ingredient,
            ...recipeIngredientData,
        };

        console.log(partialRecipeIngredient);

        const recipeIngredient = this.recipeIngredientRepository.create(partialRecipeIngredient);
        return await this.recipeIngredientRepository.save(recipeIngredient);
    }
}
