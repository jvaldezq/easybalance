import { FormRenderProps } from 'react-final-form';

import { ICURRENCY, IExpense, IIncome, PAYMENT_TYPE } from '@/lib/definitions';

export type FormPropsType = FormRenderProps<IIncome>;

export const initialValues: IIncome = {
  id: undefined,
  amount: undefined,
  description: undefined,
  category: undefined,
  currency: ICURRENCY.CRC,
  ivaTax: 0,
  rentTax: 0,
};
