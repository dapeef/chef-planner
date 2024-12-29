'use client';

import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from '@/hooks/use-toast';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {
    Recipe,
    RecipeIngredient,
} from '@/lib/types';
import { createRecipe } from '@/lib/db';


// Predefined lists
const PREDEFINED_INGREDIENTS = [
    'Salt',
    'Pepper',
    'Olive Oil',
    'Garlic',
    'Onion',
    'Flour',
    'Sugar',
    'Butter',
];

const QUANTITY_UNITS = [
    'g',
    'kg',
    'ml',
    'l',
    'tsp',
    'tbsp',
    'cup',
    'piece',
    'pinch',
];

const RecipeForm = () => {
    const form = useForm<Recipe>({
        defaultValues: {
            title: '',
            description: '',
            preparationTime: 0,
            cookingTime: 0,
            servings: 1,
            recipeIngredients: [],
        },
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [newIngredient, setNewIngredient] = useState('');
    const [currentIngredient, setCurrentIngredient] = useState<
        RecipeIngredient>({
        ingredient: {
            name: '',
        },
        quantity: 0,
        units: '',
    });
    const [recipeIngredients, setRecipeIngredients] = useState<
        RecipeIngredient[]>([]);

    const onSubmit = async (data: Recipe) => {
        try {
            setIsSubmitting(true);

            const formData: Recipe = {
                ...data,
                recipeIngredients,
            };

            await createRecipe(formData);

            // Show success message
            toast({
                title: 'Success!',
                description: 'Recipe has been created successfully.',
            });

            // Reset form
            form.reset();
            setRecipeIngredients([]);

        } catch (error) {
            console.error('Submission error:', error);
            toast({
                title: 'Error',
                description: 'Failed to create recipe. Please try again.',
                variant: 'destructive',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const addIngredient = () => {
        if (currentIngredient.ingredient.name && currentIngredient.quantity && currentIngredient.units) {
            setRecipeIngredients([...recipeIngredients, currentIngredient]);
            setCurrentIngredient({
                ingredient: {
                    name: '',
                },
                quantity: 0,
                units: '',
            });
        }
    };

    const removeIngredient = (index: number) => {
        const newIngredients = recipeIngredients.filter((_, i) => i !== index);
        setRecipeIngredients(newIngredients);
    };

    const addNewIngredientToList = () => {
        if (newIngredient && !PREDEFINED_INGREDIENTS.includes(newIngredient)) {
            PREDEFINED_INGREDIENTS.push(newIngredient);
            setNewIngredient('');
        }
    };

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>Create New Recipe</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input required {...field} placeholder="Recipe title"/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} placeholder="Recipe description"/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-3 gap-4">
                            <FormField
                                control={form.control}
                                name="preparationTime"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Prep Time (mins)</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                min="0"
                                                {...field}
                                                onChange={(e) => field.onChange(parseInt(e.target.value))}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="cookingTime"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Cook Time (mins)</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                min="0"
                                                {...field}
                                                onChange={(e) => field.onChange(parseInt(e.target.value))}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="servings"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Servings</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                min="1"
                                                {...field}
                                                onChange={(e) => field.onChange(parseInt(e.target.value))}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="space-y-4">
                            <FormLabel>Ingredients</FormLabel>

                            <div className="flex gap-2 mb-4">
                                <Input
                                    placeholder="Add new ingredient"
                                    value={newIngredient}
                                    onChange={(e) => setNewIngredient(e.target.value)}
                                />
                                <Button
                                    type="button"
                                    onClick={addNewIngredientToList}
                                    variant="outline"
                                >
                                    <Plus className="w-4 h-4"/>
                                </Button>
                            </div>

                            <div className="flex gap-2 items-end">
                                <Select
                                    value={currentIngredient.ingredient.name}
                                    onValueChange={(value) =>
                                        setCurrentIngredient({
                                            ...currentIngredient,
                                            ingredient: {
                                                name: value,
                                            },
                                        })
                                    }
                                >
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Select ingredient"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {PREDEFINED_INGREDIENTS.map((ing) => (
                                            <SelectItem key={ing} value={ing}>
                                                {ing}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                <Input
                                    type="number"
                                    min="0"
                                    className="w-24"
                                    placeholder="Qty"
                                    value={currentIngredient.quantity || ''}
                                    onChange={(e) =>
                                        setCurrentIngredient({
                                            ...currentIngredient,
                                            quantity: parseFloat(e.target.value),
                                        })
                                    }
                                />

                                <Select
                                    value={currentIngredient.units}
                                    onValueChange={(value) =>
                                        setCurrentIngredient({...currentIngredient, units: value})
                                    }
                                >
                                    <SelectTrigger className="w-[100px]">
                                        <SelectValue placeholder="Select unit"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {QUANTITY_UNITS.map((unit) => (
                                            <SelectItem key={unit} value={unit}>
                                                {unit}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                <Button
                                    type="button"
                                    onClick={addIngredient}
                                    variant="outline"
                                >
                                    <Plus className="w-4 h-4"/>
                                </Button>
                            </div>

                            <div className="space-y-2">
                                {recipeIngredients.map((ing, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between p-2 border rounded"
                                    >
                    <span>
                      {ing.quantity} {ing.units} {ing.ingredient.name}
                    </span>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => removeIngredient(index)}
                                        >
                                            <X className="w-4 h-4"/>
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={!form.getValues('title') || isSubmitting}
                        >
                            {isSubmitting ? 'Creating...' : 'Create Recipe'}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};

export default RecipeForm;