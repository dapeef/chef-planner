import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Recipe, RecipeCreator } from './recipe.entity';
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
    async create(recipeData: RecipeCreator): Promise<Recipe> {
        const partialRecipe: Partial<Recipe> = {
            ...recipeData,
            recipeIngredients: [],
        };

        for (const ingredientId of recipeData.recipeIngredientIds) {
            partialRecipe.recipeIngredients.push(
                await this.recipeIngredientService.findById(ingredientId),
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
        return await this.recipeRepository.find();
    }

    async findById(id: string): Promise<Recipe> {
        return await this.recipeRepository.findOneBy({id: id});
    }
}
