'use client';

import * as React from 'react';
import { Field, SupportedInputs } from 'react-final-form';

import { FormPropsType } from '@/app/income/new/form/types';
import { FormInput } from '@/components/Forms/Input/FormInput';
import { FormRadioBox } from '@/components/Forms/RadioBox.tsx/RadioBox';
import { FormSelect } from '@/components/Forms/Select/FormSelect';
import { FormTextarea } from '@/components/Forms/Textarea/FormTextarea';
import { Button } from '@/components/ui/button';
import { CURRENCIES, INCOME_CATEGORY } from '@/lib/constants';
import { cn } from '@/lib/utils';

export const incomeCategories = [
  {
    items: INCOME_CATEGORY,
    label: 'Categoría',
  },
];

export const IncomeForm = (props: FormPropsType) => {
  const { handleSubmit, valid } = props;

  return (
    <form
      id="income-form"
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 mb-40"
    >
      <Field
        name="amount"
        component={FormInput as unknown as SupportedInputs}
        placeholder="15,000"
        label="Monto"
        validate={(value) =>
          value !== undefined ? undefined : 'Es necesario el monto'
        }
        required={true}
        type="number"
        focus
      />
      <Field
        name="description"
        component={FormTextarea as unknown as SupportedInputs}
        placeholder="Descripción"
        label="Descripción"
        type="textarea"
        validate={(value) =>
          value !== undefined ? undefined : 'Es necesaria la descripción'
        }
        required={true}
      />
      <Field
        name="category"
        component={FormSelect as unknown as SupportedInputs}
        label="Categoría"
        className="grid grid-cols-2"
        options={incomeCategories}
        validate={(value) =>
          value !== undefined ? undefined : 'Es necesaria la categoría'
        }
        required={true}
      />
      <Field
        name="currency"
        component={FormRadioBox as unknown as SupportedInputs}
        label="Moneda"
        className="grid grid-cols-2"
        options={CURRENCIES}
      />
      <Field
        name="ivaTax"
        component={FormInput as unknown as SupportedInputs}
        label="Monto impuesto IVA"
      />
      <Field
        name="rentTax"
        component={FormInput as unknown as SupportedInputs}
        label="Monto impuesto Renta"
      />
      {valid && (
        <Button
          type="submit"
          variant="outline"
          className={cn(
            'bg-tertiary',
            'hover:bg-white',
            'hover:text-tertiary',
            'left-0',
            'right-0',
            'text-white',
            'text-sm',
            'font-bold',
            'fixed',
            'mx-auto',
            'bottom-24',
            'w-1/2',
            'rounded-3xl',
            'animate-fade-down animate-duration-[1500ms] animate-ease-in-out',
            'z-10',
          )}
        >
          Crear Ingreso
        </Button>
      )}
    </form>
  );
};
