import { Module } from '@nestjs/common';
import { RecipeIngredientService } from './recipe-ingredient.service';
import { RecipeIngredientController } from './recipe-ingredient.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeIngredient } from './recipe-ingredient.entity';

@Module({
    imports: [TypeOrmModule.forFeature([RecipeIngredient])],
    providers: [RecipeIngredientService],
    controllers: [RecipeIngredientController],
})
export class RecipeIngredientModule {
}
