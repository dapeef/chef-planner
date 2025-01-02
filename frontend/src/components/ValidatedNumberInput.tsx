import React from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RecipeIngredient } from '@/lib/types';
import { UseFormReturn } from 'react-hook-form';


interface ValidatedNumberInputProps {
    form: UseFormReturn<any, any, undefined>;
    name: string;
    title: string;
    condition?: (value: number) => boolean;
}

const ValidatedNumberInput = ({
                                  form,
                                  name,
                                  title,
                                  condition = (value: number) => value >= 0,
                              }: ValidatedNumberInputProps) => {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({field}) => {
                const [isEmpty, setIsEmpty] = React.useState(false);

                return (
                    <FormItem>
                        <FormLabel>{title}</FormLabel>
                        <FormControl>
                            <Input
                                type="number"
                                min="0"
                                value={isEmpty ? '' : field.value}
                                className={`${!condition(field.value) ? 'border-red-500' : ''}`}
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
    );
};

export default ValidatedNumberInput;