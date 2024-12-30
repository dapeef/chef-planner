import { FormLabel } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { RecipeIngredient } from '@/lib/types';
import { fetchIngredientStrings } from '@/lib/db';

interface AddIngredientProps {
    recipeIngredients: RecipeIngredient[];
    setRecipeIngredients: (value: React.SetStateAction<RecipeIngredient[]>) => void;
    allowNewIngredients: boolean;
}

const AddIngredient = ({
                           recipeIngredients,
                           setRecipeIngredients,
                           allowNewIngredients = true,
                       }: AddIngredientProps) => {

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

    const [availableIngredients, setAvailableIngredients] = useState<string[]>([]);
    const [availableUnits, setAvailableUnits] = useState<string[]>([]);

    const addIngredient = () => {
        if (currentIngredient.ingredient.name && currentIngredient.quantity && currentIngredient.unit.name) {
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
        if (newIngredient &&
            !availableIngredients.includes(newIngredient) &&
            setAvailableIngredients &&
            allowNewIngredients
        ) {
            // First update the available ingredients
            setAvailableIngredients(prev => [...prev, newIngredient]);

            // Use setTimeout to ensure the dropdown has updated
            setTimeout(() => {
                setCurrentIngredient({
                    ...currentIngredient,
                    ingredient: {
                        name: newIngredient,
                    },
                });
            }, 0);

            // Clear the input
            setNewIngredient('');
        }
    };

    useEffect(() => {
        fetchIngredientStrings(setAvailableIngredients, setAvailableUnits);
    }, []); // Empty dependency array ensures it runs only once when the component mounts.

    return (
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

                {/*TODO make this go red if empty*/}
                <Input
                    type="number"
                    min="0"
                    className="flex-1"
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
                    disabled={
                        !currentIngredient.ingredient.name ||
                        !currentIngredient.quantity ||
                        !currentIngredient.unit.name
                    }
                >
                    <Plus className="w-4 h-4"/>
                </Button>
            </div>

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