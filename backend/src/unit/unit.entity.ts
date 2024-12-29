import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Unique } from 'typeorm';
import { RecipeIngredient } from '../recipe-ingredient/recipe-ingredient.entity';


export interface Dimension {
    time: number;
    length: number;
    mass: number;
    electricCurrent: number;
    absoluteTemperature: number;
    amountOfSubstance: number;
    luminousIntensity: number;
}

export class Dimension {
    constructor(initValues: Partial<Dimension> = {}) {
        this.time = initValues.time ?? 0;
        this.length = initValues.length ?? 0;
        this.mass = initValues.mass ?? 0;
        this.electricCurrent = initValues.electricCurrent ?? 0;
        this.absoluteTemperature = initValues.absoluteTemperature ?? 0;
        this.amountOfSubstance = initValues.amountOfSubstance ?? 0;
        this.luminousIntensity = initValues.luminousIntensity ?? 0;
    }
}


@Entity('units')
@Unique(['name'])
export class Unit {
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column()
    name: string;

    @Column({
        type: 'json',
        transformer: {
            to: (value: Dimension) => JSON.stringify(value), // Transform to JSON string for the database
            from: (value: string) => JSON.parse(value) as Dimension, // Transform back to Dimension object
        },
    })
    dimension: Dimension;

    @Column({type: 'float'})
    siFactor: number; // How many times larger this unit is than the SI unit of the same dimension

    @OneToMany(() => RecipeIngredient, (recipeIngredient) => recipeIngredient.recipe, {cascade: true})
    recipeIngredients?: RecipeIngredient[];
}


export const STANDARD_UNITS: Unit[] = [
    // Unitless
    {
        name: 'unitless',
        dimension: new Dimension({}),
        siFactor: 1,
    },

    // Mass
    {
        name: 'g',
        dimension: new Dimension({
            mass: 1,
        }),
        siFactor: 1e-3,
    },
    {
        name: 'kg',
        dimension: new Dimension({
            mass: 1,
        }),
        siFactor: 1,
    },
    {
        name: 'oz',
        dimension: new Dimension({
            mass: 1,
        }),
        siFactor: 0.0283495,
    },
    {
        name: 'lb',
        dimension: new Dimension({
            mass: 1,
        }),
        siFactor: 0.453592,
    },
    {
        name: 'st',
        dimension: new Dimension({
            mass: 1,
        }),
        siFactor: 6.35029,
    },
    {
        name: 'tin', // eg of beans
        dimension: new Dimension({
            mass: 1,
        }),
        siFactor: 0.415,
    },

    // Volume
    {
        name: 'ml',
        dimension: new Dimension({
            length: 3,
        }),
        siFactor: 1e-3,
    },
    {
        name: 'l',
        dimension: new Dimension({
            length: 3,
        }),
        siFactor: 1,
    },
    {
        name: 'cups', // Imperial
        dimension: new Dimension({
            length: 3,
        }),
        siFactor: 0.284131,
    },
    {
        name: 'pints', // Imperial
        dimension: new Dimension({
            length: 3,
        }),
        siFactor: 0.568261,
    },
    {
        name: 'teaspoons', // Imperial
        dimension: new Dimension({
            length: 3,
        }),
        siFactor: 0.00591939,
    },
    {
        name: 'tablespoons', // Imperial
        dimension: new Dimension({
            length: 3,
        }),
        siFactor: 0.0177582,
    },
];
