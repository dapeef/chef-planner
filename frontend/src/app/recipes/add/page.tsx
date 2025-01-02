'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from '@/hooks/use-toast';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
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
import AddIngredient from '@/components/AddIngredient';
import ValidatedNumberInput from '@/components/ValidatedNumberInput';

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
    const [recipeIngredients, setRecipeIngredients] = useState<RecipeIngredient[]>([]);

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

    return (
        <Card className="w-full max-w-2xl mx-auto mt-16 mb-16">
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
                            <ValidatedNumberInput
                                form={form}
                                name={'preparationTime'}
                                title={'Preparation time (mins)'}
                            />

                            <ValidatedNumberInput
                                form={form}
                                name={'cookingTime'}
                                title={'Cooking time (mins)'}
                            />

                            <ValidatedNumberInput
                                form={form}
                                name={'servings'}
                                title={'Servings'}
                                condition={(value: number) => value > 0}
                            />
                        </div>

                        <AddIngredient
                            recipeIngredients={recipeIngredients}
                            setRecipeIngredients={setRecipeIngredients}
                            allowNewIngredients={true}
                        />

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