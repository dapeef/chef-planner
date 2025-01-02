import React from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';


interface ValidatedNumberInputProps {
    form: UseFormReturn<any>;
    name: string;
    title?: string | undefined;
    placeholder?: string;
    condition?: (value: number) => boolean;
}

const ValidatedNumberInput = ({
                                  form,
                                  name,
                                  title,
                                  placeholder,
                                  condition = (value: number) => value >= 0,
                              }: ValidatedNumberInputProps) => {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({field}) => {
                const [isEmpty, setIsEmpty] = React.useState(false);

                return (
                    <FormItem
                        className={'w-full'}
                    >
                        {title && <FormLabel>{title}</FormLabel>}
                        <FormControl>
                            <Input
                                type="number"
                                min="0"
                                value={isEmpty ? '' : field.value}
                                placeholder={placeholder}
                                className={`w-full ${!condition(field.value) ? 'border-red-500' : ''}`}
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