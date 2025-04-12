import { IBILL_TYPE, ICURRENCY } from '@/lib/definitions';

interface Expense {
  totalYear: number;
  totalMonth: number;
}

export interface GeneralBill {
  id: string;
  name: string;
  type: IBILL_TYPE;
  currency: ICURRENCY;
  monthlyAmount: number;
  annualAmount: number;
  accumulatedAmount: number;
  expenses: Expense;
}

interface GeneralDataEntry {
  totalToday: number;
  totalMonth: number;
  totalYear: number;
}

export interface GeneralData {
  CRC: GeneralDataEntry;
  USD: GeneralDataEntry;
}

export interface GeneralBillResponse {
  bills: GeneralBill[];
  generalData: GeneralData;
}
