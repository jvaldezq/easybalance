'use client';

import { useCallback } from 'react';
import { Form } from 'react-final-form';

import { BillForm } from '@/app/bills/new/form/BillForm';
import {
  billFormInitialValues,
  BillFormProps,
} from '@/app/bills/new/form/types';

export const CreateBill = () => {
  const onSubmit = useCallback((data: BillFormProps) => {
    console.log(data);
  }, []);

  return (
    <Form initialValues={billFormInitialValues} onSubmit={onSubmit}>
      {(formProps) => <BillForm {...formProps} />}
    </Form>
  );
};
