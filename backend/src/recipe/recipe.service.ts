import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Recipe } from './recipe.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RecipeService {
    constructor(
        @InjectRepository(Recipe)
        private readonly recipeRepository: Repository<Recipe>,
    ) {}

    // Create a new recipe
    async create(recipeData: Partial<Recipe>): Promise<Recipe> {
        const recipe = this.recipeRepository.create(recipeData);
        const savedRecipe = await this.recipeRepository.save(recipe);

        return this.recipeRepository.findOne({
            where: {id: savedRecipe.id},
            relations: ['recipeIngredients', 'recipeIngredients.ingredient'],
        });
    }
}
