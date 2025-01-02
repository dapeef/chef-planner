import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Plus, X } from 'lucide-react';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from '@/components/ui/form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { fetchIngredientStrings } from '@/lib/db';
import { RecipeIngredient } from '@/lib/types';
import ValidatedNumberInput from '@/components/ValidatedNumberInput';

// Define the form schema
const addIngredientSchema = z.object({
    ingredient: z.object({
        name: z.string().min(1, 'Ingredient is required'),
    }),
    quantity: z.number().min(0.01, 'Quantity must be greater than 0'),
    unit: z.object({
        name: z.string().min(1, 'Unit is required'),
    }),
});

type AddIngredientFormValues = z.infer<typeof addIngredientSchema>;

interface AddIngredientProps {
    formName?: string;
    recipeIngredients: RecipeIngredient[];
    setRecipeIngredients: (value: React.SetStateAction<RecipeIngredient[]>) => void;
    allowNewIngredients?: boolean;
}

const AddIngredient = ({
                           formName = 'Ingredients',
                           recipeIngredients,
                           setRecipeIngredients,
                           allowNewIngredients = true,
                       }: AddIngredientProps) => {
    const [availableIngredients, setAvailableIngredients] = useState<string[]>([]);
    const [availableUnits, setAvailableUnits] = useState<string[]>([]);
    const [newIngredient, setNewIngredient] = useState('');

    const containerRef = useRef<HTMLDivElement>(null);
    const [isNarrow, setIsNarrow] = useState(false);

    // Initialize the form
    const form = useForm<AddIngredientFormValues>({
        resolver: zodResolver(addIngredientSchema),
        defaultValues: {
            ingredient: {name: ''},
            quantity: 0,
            unit: {name: ''},
        },
    });

    const addIngredient = (values: AddIngredientFormValues) => {
        setRecipeIngredients([...recipeIngredients, values]);
        form.reset();
    };

    const removeIngredient = (index: number) => {
        const newIngredients = recipeIngredients.filter((_, i) => i !== index);
        setRecipeIngredients(newIngredients);
    };

    const addNewIngredientToList = () => {
        if (
            newIngredient &&
            !availableIngredients.includes(newIngredient) &&
            allowNewIngredients
        ) {
            setAvailableIngredients((prev) => [...prev, newIngredient]);

            setTimeout(() => {
                form.setValue('ingredient.name', newIngredient);
            }, 0);

            setNewIngredient('');
        }
    };

    const createWidthUpdater = () => {
        if (!containerRef.current) {
            return;
        }

        const checkSize = () => {
            const containerWidth = containerRef.current?.getBoundingClientRect().width;
            if (!containerWidth) {
                return;
            }
            setIsNarrow(containerWidth < 500);
        };

        checkSize();
        const observer = new ResizeObserver(checkSize);
        observer.observe(containerRef.current);

        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
            }
        };
    };

    useEffect(() => {
        fetchIngredientStrings(setAvailableIngredients, setAvailableUnits);
        createWidthUpdater();
    }, []);

    return (
        <div className="space-y-4" ref={containerRef}>
            <FormLabel>{formName}</FormLabel>

            <Form {...form}>
                <div className={`flex gap-2 ${isNarrow ? 'flex-col w-full' : 'items-end'}`}>
                    <div className={`flex gap-2 ${isNarrow ? 'w-full' : ''}`}>
                        <FormField
                            control={form.control}
                            name="ingredient.name"
                            render={({field}) => (
                                <FormItem
                                    className={isNarrow ? 'w-full' : ''}>
                                    <FormControl>
                                        <Select
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger className={isNarrow ? 'w-full' : 'w-[150px]'}>
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
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className={`flex gap-2 w-full`}>
                        <ValidatedNumberInput
                            form={form}
                            name={'quantity'}
                            placeholder={'Qty'}
                            condition={(value: number) => value > 0}
                        />

                        <FormField
                            control={form.control}
                            name="unit.name"
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <Select
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger className={`w-[120px] ${isNarrow ? 'flex-1' : ''}`}>
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
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <Button
                            type="button"
                            variant="outline"
                            disabled={!form.formState.isValid}
                            onClick={() => form.handleSubmit(addIngredient)()}
                        >
                            <Plus className="w-4 h-4"/>
                        </Button>
                    </div>
                </div>
            </Form>

            {allowNewIngredients && (<div className="flex gap-2 mb-4">
                <Input
                    placeholder="Brand new ingredient name"
                    value={newIngredient}
                    onChange={(e) => setNewIngredient(e.target.value)}
                />
                <Button
                    type="button"
                    onClick={addNewIngredientToList}
                    variant="outline"
                    disabled={!newIngredient}
                >
                    <Plus className="w-4 h-4"/>
                </Button>
            </div>)}

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
    );
};

export default AddIngredient;