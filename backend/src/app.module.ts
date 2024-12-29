import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecipeModule } from './recipe/recipe.module';
import { IngredientModule } from './ingredient/ingredient.module';
import { RecipeIngredientModule } from './recipe-ingredient/recipe-ingredient.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recipe } from './recipe/recipe.entity';
import { Ingredient } from './ingredient/ingredient.entity';
import { RecipeIngredient } from './recipe-ingredient/recipe-ingredient.entity';
import { UnitModule } from './unit/unit.module';
import { Unit } from './unit/unit.entity';

@Module({
    imports: [
        RecipeModule,
        IngredientModule,
        RecipeIngredientModule,
        ConfigModule.forRoot({
            isGlobal: true, // Makes the config module globally available
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get<string>('DB_HOST'),
                port: configService.get<number>('DB_PORT'),
                username: configService.get<string>('DB_USERNAME'),
                password: configService.get<string>('DB_PASSWORD'),
                database: configService.get<string>('DB_NAME'),
                entities: [Recipe, Ingredient, RecipeIngredient, Unit],
                synchronize: configService.get<string>('NODE_ENV') === 'dev', // Automatically updates database schema;
                                                                              // turn off in production.
            }),
        }),
        TypeOrmModule.forFeature([
            Recipe,
            Ingredient,
            RecipeIngredient,
            Unit,
        ]),
        UnitModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
