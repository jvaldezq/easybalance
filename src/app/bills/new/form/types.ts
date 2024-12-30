import { FormRenderProps } from 'react-final-form';

export interface BillFormProps {
  id?: string;
  amount?: number;
  category?: string;
  description?: string;
  currency?: string;
}

export type FormPropsType = FormRenderProps<BillFormProps>;

export const billFormInitialValues: BillFormProps = {
  id: undefined,
  amount: undefined,
  category: undefined,
  description: undefined,
  currency: 'colon',
};
