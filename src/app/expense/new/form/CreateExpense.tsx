'use client';

import { redirect } from 'next/navigation';
import { useCallback } from 'react';
import { Form } from 'react-final-form';

import { expenseFormInitialValues } from '@/app/expense/new/form/types';
import { useCreateExpenseMutation } from '@/app/expense/services/client';
import { IExpense } from '@/lib/definitions';

import { ExpenseForm } from './ExpenseForm';

export const CreateExpense = () => {
  const { mutateAsync } = useCreateExpenseMutation();
  const onSubmit = useCallback(
    (data: IExpense) => {
      mutateAsync(data).then(() => {
        redirect('/expense');
      });
    },
    [mutateAsync],
  );

  return (
    <Form initialValues={expenseFormInitialValues} onSubmit={onSubmit}>
      {(formProps) => <ExpenseForm {...formProps} />}
    </Form>
  );
};
