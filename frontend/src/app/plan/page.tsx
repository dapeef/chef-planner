'use client';

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from '@/hooks/use-toast';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Calendar } from '@/components/ui/calendar';
import { DateRange } from 'react-day-picker';
import { addDays } from 'date-fns';
import AddIngredient from '@/components/AddIngredient';
import { RecipeIngredient } from '@/lib/types';

// Define types for the form data
interface DayConfig {
    date: Date;
    lunchMeals: number;
    dinnerMeals: number;
    prepTime: number;
}

interface MealPlanForm {
    dateRange: DateRange | undefined;
    dailyConfigs: DayConfig[];
}

const MealPlanForm: React.FC = () => {
    const form = useForm<MealPlanForm>({
        defaultValues: {
            dateRange: undefined,
            dailyConfigs: [],
        },
    });

    const [dateRange, setDateRange] = React.useState<DateRange | undefined>(undefined);
    const [recipeIngredients, setRecipeIngredients] = React.useState<RecipeIngredient[]>([]);

    // Handle date change
    const handleDateChange = (dateRange: DateRange | undefined) => {
        // Check that the date range isn't undefined
        if (!dateRange || !dateRange.to || !dateRange.from) {
            return;
        }

        form.setValue('dateRange', dateRange);

        const timeDifference = dateRange.to.getTime() - dateRange.from.getTime();
        const calculatedDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

        // Initialize dailyConfigs with default values
        const config: DayConfig[] = [];
        for (let i = 0; i < calculatedDays + 1; i++) {
            config.push({
                date: addDays(dateRange.from, i),
                lunchMeals: 2,
                dinnerMeals: 2,
                prepTime: 45,
            });
        }

        form.setValue('dailyConfigs', config);
    };

    // Form submission
    const onSubmit: SubmitHandler<MealPlanForm> = (data) => {
        if (!data.dateRange || !data.dateRange.to || !data.dateRange.from) {
            toast({
                title: 'Error',
                description: 'Please select the date range date.',
                variant: 'destructive',
            });
            return;
        }

        console.log('Meal Plan Data:', data);
        toast({
            title: 'Success!',
            description: 'Meal plan created successfully.',
        });
    };

    return (
        <div>
            <Card className="w-full max-w-3xl mx-auto mt-16 mb-16">
                <CardHeader>
                    <CardTitle>Create Meal Plan</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid grid-cols-1 gap-4 xs:grid-cols-1 md:grid-cols-2">
                                {/* End Date Picker */}
                                <div className="p-4 border rounded space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="dateRange"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Select Date Range</FormLabel>
                                                <FormControl>
                                                    <Calendar
                                                        mode="range"
                                                        selected={dateRange}
                                                        onSelect={(date: DateRange | undefined) => {
                                                            setDateRange(date);
                                                            handleDateChange(date); // Pass null if date is undefined
                                                            field.onChange(date || null); // Update form state
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                {/* Add ingredients */}
                                <div className="p-4 border rounded space-y-4">
                                    <AddIngredient
                                        formName="Existing ingredients"
                                        recipeIngredients={recipeIngredients}
                                        setRecipeIngredients={setRecipeIngredients}
                                        allowNewIngredients={false}
                                    />
                                </div>
                            </div>

                            {/* Daily Configurations */}
                            {form.watch('dailyConfigs').map((_, index) => (
                                <div
                                    key={index}
                                    className="p-4 border rounded space-y-4"
                                >
                                    <h3 className="font-semibold">
                                        {(() => {
                                            // Format the date to show the day of the week, day of the month, and month
                                            const options: Intl.DateTimeFormatOptions = {
                                                weekday: 'long', // Day of the week (e.g., "Monday")
                                                day: 'numeric',  // Day of the month (e.g., 1, 2, 3, ...)
                                                month: 'short',   // Full month name (e.g., "January")
                                            };

                                            const date = form.getValues('dailyConfigs')[index].date;

                                            return date.toLocaleDateString('en-UK', options);
                                        })()}
                                    </h3>

                                    <div className="grid grid-cols-3 gap-4">
                                        <FormField
                                            control={form.control}
                                            name={`dailyConfigs.${index}.lunchMeals` as const}
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>Lunch meals</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="number"
                                                            min="0"
                                                            {...field}
                                                            className="w-full"
                                                        />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name={`dailyConfigs.${index}.dinnerMeals` as const}
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>Dinner meals</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="number"
                                                            min="0"
                                                            {...field}
                                                            className="w-full"
                                                        />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name={`dailyConfigs.${index}.prepTime` as const}
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>Available prep time (mins)</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="number"
                                                            min="0"
                                                            {...field}
                                                            className="w-full"
                                                        />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                            ))}

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={
                                    !form.getValues('dateRange') ||
                                    !form.getValues('dateRange')?.from ||
                                    !form.getValues('dateRange')?.to
                                }
                            >
                                Create Meal Plan
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
};

export default MealPlanForm;
