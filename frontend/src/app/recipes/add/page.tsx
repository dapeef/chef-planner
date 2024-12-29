'use client';

import React, { useEffect, useState } from 'react';
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
import { createRecipe, getAllIngredientStrings, getAllUnitStrings } from '@/lib/db';

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

    const [availableIngredients, setAvailableIngredients] = useState<string[]>([]);
    const [availableUnits, setAvailableUnits] = useState<string[]>([]);

    useEffect(() => {
        fetchAvailableIngredientsAndUnits();
    }, []); // Empty dependency array ensures it runs only once when the component mounts.

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [newIngredient, setNewIngredient] = useState('');
    const [currentIngredient, setCurrentIngredient] = useState<
        RecipeIngredient>({
        ingredient: {
            name: '',
        },
        quantity: 0,
        unit: {
            name: '',
        },
    });
    const [recipeIngredients, setRecipeIngredients] = useState<
        RecipeIngredient[]>([]);

    const fetchAvailableIngredientsAndUnits = async () => {
        try {
            const ingredients = await getAllIngredientStrings();
            setAvailableIngredients(ingredients);

            const units = await getAllUnitStrings();
            setAvailableUnits(units);
        } catch (error) {
            console.error('Error fetching ingredients:', error);
        }
    };

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

            fetchAvailableIngredientsAndUnits();
        }
    };

    const addIngredient = () => {
        if (currentIngredient.ingredient.name && currentIngredient.quantity && currentIngredient.unit) {
            setRecipeIngredients([...recipeIngredients, currentIngredient]);
            setCurrentIngredient({
                ingredient: {
                    name: '',
                },
                quantity: 0,
                unit: {
                    name: '',
                },
            });
        }
    };

    const removeIngredient = (index: number) => {
        const newIngredients = recipeIngredients.filter((_, i) => i !== index);
        setRecipeIngredients(newIngredients);
    };

    const addNewIngredientToList = () => {
        if (newIngredient && !availableIngredients.includes(newIngredient)) {
            availableIngredients.push(newIngredient);
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
                            render={({field}) => {
                                const isTouched = form.formState.touchedFields.title;

                                return (<FormItem>
                                    <FormLabel>Title *</FormLabel>
                                    <FormControl>
                                        <Input
                                            required
                                            {...field}
                                            className={`${isTouched && !field.value ? 'border-red-500' : ''}`}
                                            placeholder="Recipe title"/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>);
                            }}
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
                                render={({field}) => {
                                    const [isEmpty, setIsEmpty] = React.useState(false);

                                    return (
                                        <FormItem>
                                            <FormLabel>Preparation time (mins)</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    min="0"
                                                    value={isEmpty ? '' : field.value}
                                                    className={`${field.value < 0 ? 'border-red-500' : ''}`}
                                                    onChange={(e) => {
                                                        const newValue = e.target.value;
                                                        setIsEmpty(newValue === '');
                                                        field.onChange(newValue === '' ? 0 : parseInt(newValue));
                                                    }}
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    );
                                }}
                            />

                            <FormField
                                control={form.control}
                                name="cookingTime"
                                render={({field}) => {
                                    const [isEmpty, setIsEmpty] = React.useState(false);

                                    return (
                                        <FormItem>
                                            <FormLabel>Cooking time (mins)</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    min="0"
                                                    value={isEmpty ? '' : field.value}
                                                    className={`${field.value < 0 ? 'border-red-500' : ''}`}
                                                    onChange={(e) => {
                                                        const newValue = e.target.value;
                                                        setIsEmpty(newValue === '');
                                                        field.onChange(newValue === '' ? 0 : parseInt(newValue));
                                                    }}
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    );
                                }}
                            />

                            <FormField
                                control={form.control}
                                name="servings"
                                render={({field}) => {
                                    const [isEmpty, setIsEmpty] = React.useState(false);

                                    return (
                                        <FormItem>
                                            <FormLabel>Servings</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    min="0"
                                                    value={isEmpty ? '' : field.value}
                                                    className={`${field.value <= 0 ? 'border-red-500' : ''}`}
                                                    onChange={(e) => {
                                                        const newValue = e.target.value;
                                                        setIsEmpty(newValue === '');
                                                        field.onChange(newValue === '' ? 0 : parseInt(newValue));
                                                    }}
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    );
                                }}
                            />
                        </div>

                        <div className="space-y-4">
                            <FormLabel>Ingredients</FormLabel>

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
                                        {availableIngredients.map((ing) => (
                                            <SelectItem key={ing} value={ing}>
                                                {ing}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                <Input
                                    type="number"
                                    min="0"
                                    className="w-100%"
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
                                    value={currentIngredient.unit.name}
                                    onValueChange={(value) =>
                                        setCurrentIngredient({...currentIngredient, unit: {name: value}})
                                    }
                                >
                                    <SelectTrigger className="w-[150px]">
                                        <SelectValue placeholder="Select unit"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {availableUnits.map((unit) => (
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

                            <div className="flex gap-2 mb-4">
                                <Input
                                    placeholder="Brand new ingredient name"
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

                            <div className="space-y-2">
                                {recipeIngredients.map((ing, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between p-2 border rounded"
                                    >
                    <span>
                      {ing.quantity} {ing.unit.name} {ing.ingredient.name}
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
                            disabled={
                                !form.getValues('title') ||
                                form.getValues('preparationTime') < 0 ||
                                form.getValues('cookingTime') < 0 ||
                                form.getValues('servings') <= 0 ||
                                isSubmitting
                            }
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