import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecipeIngredient } from './recipe-ingredient.entity';
import { IngredientService } from '../ingredient/ingredient.service';
import { UnitService } from '../unit/unit.service';

@Injectable()
export class RecipeIngredientService {
    constructor(
        @InjectRepository(RecipeIngredient)
        private readonly recipeIngredientRepository: Repository<RecipeIngredient>,
        private readonly ingredientService: IngredientService,
        private readonly unitService: UnitService,
    ) {}

    // Create a new recipe ingredient
    async create(recipeIngredientData: RecipeIngredient): Promise<RecipeIngredient> {
        const ingredient = await this.ingredientService.softCreate({
            name: recipeIngredientData.ingredient.name,
        });
        const unit = await this.unitService.softCreate({
            name: recipeIngredientData.unit.name,
        });

        const partialRecipeIngredient: RecipeIngredient = {
            ...recipeIngredientData,
            ingredient: ingredient,
            unit: unit,
        };

        const recipeIngredient = this.recipeIngredientRepository.create(partialRecipeIngredient);
        return await this.recipeIngredientRepository.save(recipeIngredient);
    }

    async findAll(): Promise<RecipeIngredient[]> {
        return await this.recipeIngredientRepository.find();
    }

    async findById(id: string): Promise<RecipeIngredient> {
        return await this.recipeIngredientRepository.findOneBy({id: id});
    }
}
