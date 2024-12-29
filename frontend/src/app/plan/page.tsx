'use client';

import React, { useState } from 'react';
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

// Define types for the form data
interface DayConfig {
    lunchMeals: number;
    dinnerMeals: number;
    prepTime: number;
}

interface MealPlanForm {
    endDate: Date | null;
    dailyConfigs: DayConfig[];
}

const MealPlanForm: React.FC = () => {
    const form = useForm<MealPlanForm>({
        defaultValues: {
            endDate: null,
            dailyConfigs: [],
        },
    });

    const [days, setDays] = useState<number>(0);

    // Handle date change
    const handleDateChange = (date: Date | undefined) => {
        if (!date) {
            return;
        }

        form.setValue('endDate', date);

        const currentDate = new Date();
        const timeDifference = date.getTime() - currentDate.getTime();
        const calculatedDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
        setDays(calculatedDays);

        // Initialize dailyConfigs with default values
        form.setValue(
            'dailyConfigs',
            Array.from({length: calculatedDays}, () => ({
                lunchMeals: 0,
                dinnerMeals: 0,
                prepTime: 0,
            })),
        );
    };

    // Form submission
    const onSubmit: SubmitHandler<MealPlanForm> = (data) => {
        if (!data.endDate) {
            toast({
                title: 'Error',
                description: 'Please select an end date.',
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
                            {/* End Date Picker */}
                            <FormField
                                control={form.control}
                                name="endDate"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Select End Date</FormLabel>
                                        <FormControl>
                                            {/*TODO turn this into a single, range select*/}
                                            {/*TODO only allow future (or current) dates to be selected*/}
                                            <Calendar
                                                mode="single"
                                                selected={field.value ? new Date(field.value) : undefined} // Convert to Date if not null
                                                onSelect={(date: Date | undefined) => {
                                                    handleDateChange(date); // Pass null if date is undefined
                                                    field.onChange(date || null); // Update form state
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            {/* Daily Configurations */}
                            {form.watch('dailyConfigs').map((_, index) => (
                                <div
                                    key={index}
                                    className="p-4 border rounded space-y-4"
                                >
                                    <h3 className="font-semibold">
                                        {(() => {
                                            // Calculate the date corresponding to today + index days
                                            const today = new Date();
                                            today.setDate(today.getDate() + index + 1); // Add the index to today (in days)

                                            // Format the date to show the day of the week, day of the month, and month
                                            const options: Intl.DateTimeFormatOptions = {
                                                weekday: 'long', // Day of the week (e.g., "Monday")
                                                day: 'numeric',  // Day of the month (e.g., 1, 2, 3, ...)
                                                month: 'short',   // Full month name (e.g., "January")
                                            };

                                            return today.toLocaleDateString('en-UK', options);
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
                                disabled={!form.getValues('endDate')}
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
