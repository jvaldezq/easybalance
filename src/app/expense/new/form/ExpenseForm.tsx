'use client';

import * as React from 'react';
import { useEffect } from 'react';
import { Field, SupportedInputs } from 'react-final-form';

import { ExpenseSummary } from '@/app/expense/new/form/ExpenseSummary';
import { FormPropsType } from '@/app/expense/new/form/types';
import {
  useBillListQuery,
  useMonthExpenseAmountQuery,
} from '@/app/expense/services/client';
import { FormInput } from '@/components/Forms/Input/FormInput';
import { FormRadioBox } from '@/components/Forms/RadioBox.tsx/RadioBox';
import { FormSelect } from '@/components/Forms/Select/FormSelect';
import { FormTextarea } from '@/components/Forms/Textarea/FormTextarea';
import { Button } from '@/components/ui/button';
import { CURRENCIES, PAYMENT_METHODS } from '@/lib/constants';
import { cn } from '@/lib/utils';

export const paymentMethods = [
  {
    items: PAYMENT_METHODS,
    label: 'Métodos de pago',
  },
];

export const ExpenseForm = (props: FormPropsType) => {
  const { handleSubmit, valid, values, form } = props;
  const { data } = useMonthExpenseAmountQuery({ billId: values.billId || '' });

  useEffect(() => {
    if (data?.bill?.currency) {
      form.change('currency', data?.bill?.currency);
    }
  }, [data?.bill?.currency, form]);

  const { data: categories } = useBillListQuery();

  return (
    <form
      id="bill-form"
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
        type="number"
        focus
      />
      <Field
        name="billId"
        component={FormSelect as unknown as SupportedInputs}
        label="Categoría"
        validate={(value) =>
          value !== undefined ? undefined : 'Es necesario la categoría'
        }
        options={categories}
      />
      <Field
        name="paymentMethod"
        component={FormSelect as unknown as SupportedInputs}
        placeholder="Método de pago"
        label="Método de pago"
        options={paymentMethods}
      />
      <Field
        name="currency"
        component={FormRadioBox as unknown as SupportedInputs}
        label="Moneda"
        className="grid grid-cols-2"
        options={CURRENCIES}
        disabled={true}
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
            'z-10',
          )}
        >
          Crear Gasto
        </Button>
      )}

      <ExpenseSummary {...data} />
    </form>
  );
};
