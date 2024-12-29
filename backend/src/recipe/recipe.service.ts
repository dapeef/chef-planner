import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Recipe } from './recipe.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RecipeIngredientService } from '../recipe-ingredient/recipe-ingredient.service';

@Injectable()
export class RecipeService {
    constructor(
        @InjectRepository(Recipe)
        private readonly recipeRepository: Repository<Recipe>,
        private readonly recipeIngredientService: RecipeIngredientService,
    ) {}

    // Create a new recipe
    async create(recipeData: Recipe): Promise<Recipe> {
        const partialRecipe: Recipe = {
            ...recipeData,
            recipeIngredients: [],
        };

        for (const recipeIngredient of recipeData.recipeIngredients) {
            partialRecipe.recipeIngredients.push(
                await this.recipeIngredientService.create(recipeIngredient),
            );
        }

        const recipe = this.recipeRepository.create(partialRecipe);
        const savedRecipe = await this.recipeRepository.save(recipe);

        return this.recipeRepository.findOne({
            where: {id: savedRecipe.id},
            relations: ['recipeIngredients', 'recipeIngredients.ingredient'],
        });
    }

    async findAll(): Promise<Recipe[]> {
        return await this.recipeRepository.find({
            relations: ['recipeIngredients', 'recipeIngredients.ingredient'],
        });
    }

    async findById(id: string): Promise<Recipe> {
        return await this.recipeRepository.findOne({
            where: {id: id},
            relations: ['recipeIngredients', 'recipeIngredients.ingredient'],
        });
    }
}
