import { FormRenderProps } from 'react-final-form';

import { ICURRENCY, IExpense, PAYMENT_TYPE } from '@/lib/definitions';

export type FormPropsType = FormRenderProps<IExpense>;

export const expenseFormInitialValues: IExpense = {
  id: undefined,
  amount: undefined,
  billId: undefined,
  description: undefined,
  paymentMethod: PAYMENT_TYPE.CREDIT_CARD,
  currency: ICURRENCY.CRC,
};
