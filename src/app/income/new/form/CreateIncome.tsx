'use client';

import { useCallback } from 'react';
import { Form } from 'react-final-form';

import { useCreateExpenseMutation } from '@/app/expense/services/client';
import { initialValues } from '@/app/income/new/form/types';
import { IExpense } from '@/lib/definitions';

import { IncomeForm } from './IncomeForm';

export const CreateIncome = () => {
  const { mutateAsync } = useCreateExpenseMutation();
  const onSubmit = useCallback(
    (data: IExpense) => {
      console.log('HELLO', data);
      // mutateAsync(data).then(() => {
      //   redirect('/expense');
      // });
    },
    [mutateAsync],
  );

  return (
    <Form initialValues={initialValues} onSubmit={onSubmit}>
      {(formProps) => <IncomeForm {...formProps} />}
    </Form>
  );
};
