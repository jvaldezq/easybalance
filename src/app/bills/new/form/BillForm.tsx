'use client';

import * as React from 'react';
import { Field, SupportedInputs } from 'react-final-form';

import { FormPropsType } from '@/app/bills/new/form/types';
import { FormInput } from '@/components/Forms/Input/FormInput';
import { FormRadioBox } from '@/components/Forms/RadioBox.tsx/RadioBox';
import { FormSelect } from '@/components/Forms/Select/FormSelect';
import { FormTextarea } from '@/components/Forms/Textarea/FormTextarea';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const currencies = [
  { id: 'dollar', name: '$' },
  { id: 'colon', name: '₡' },
];

// TODO Integrate with backend
const categories = [
  {
    items: [
      {
        id: 'a3va15bac',
        name: 'Alimentación',
      },
      {
        id: 'a3va1523bac',
        name: 'Tarjeta de crédito',
      },
      {
        id: 'a3va15t21bac',
        name: 'Alimentación',
      },
    ],
    label: 'Categoría',
  },
];

export const BillForm = (props: FormPropsType) => {
  const { handleSubmit, valid } = props;

  return (
    <form
      id="bill-form"
      onSubmit={handleSubmit}
      className="flex flex-col gap-4"
    >
      <Field
        name="currency"
        component={FormRadioBox as unknown as SupportedInputs}
        label="Moneda"
        className="grid grid-cols-2"
        options={currencies}
      />
      <Field
        name="amount"
        component={FormInput as unknown as SupportedInputs}
        placeholder="Monto"
        label="Monto"
        validate={(value) =>
          value !== undefined ? undefined : 'Es necesario el monto'
        }
        type="number"
      />
      <Field
        name="category"
        component={FormSelect as unknown as SupportedInputs}
        placeholder="Categoría"
        label="Categoría"
        validate={(value) =>
          value !== undefined ? undefined : 'Es necesario la categoría'
        }
        options={categories}
      />
      <Field
        name="description"
        component={FormTextarea as unknown as SupportedInputs}
        placeholder="Descripción"
        label="Descripción"
        type="textarea"
      />
      {valid && (
        <Button
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
          )}
        >
          Crear Gasto
        </Button>
      )}
    </form>
  );
};
