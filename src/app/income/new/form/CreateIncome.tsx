'use client';

import { redirect } from 'next/navigation';
import { useCallback } from 'react';
import { Form } from 'react-final-form';

import { initialValues } from '@/app/income/new/form/types';
import { useCreateIncomeMutation } from '@/app/income/services/createIncome';
import { IIncome } from '@/lib/definitions';

import { IncomeForm } from './IncomeForm';

export const CreateIncome = () => {
  const { mutateAsync } = useCreateIncomeMutation();
  const onSubmit = useCallback(
    (data: IIncome) => {
      mutateAsync(data).then(() => {
        redirect('/income');
      });
    },
    [mutateAsync],
  );

  return (
    <Form initialValues={initialValues} onSubmit={onSubmit}>
      {(formProps) => <IncomeForm {...formProps} />}
    </Form>
  );
};
