export interface IBill {
  id?: string;
  name?: string;
  category?: IBILL_CATEGORY;
  type?: IBILL_TYPE;
  amount?: number;
  accumulatedAmount?: number;
  currency?: ICURRENCY;
  isPublic?: boolean;
  expenses?: IExpense[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IExpense {
  id?: string;
  description?: string;
  currency?: ICURRENCY;
  paymentMethod?: PAYMENT_TYPE;
  amount?: number;
  billId?: string;
  bill?: IBill;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IIncome {
  id?: string;
  description?: string;
  category?: string;
  amount?: number;
  currency?: ICURRENCY;
  ivaTax?: number;
  rentTax?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICredit {
  id: string;
  bank: string;
  interestRate?: number | null;
  interestMoratorium?: number | null;
  currency: string;
  interestAnual: number;
  balance: number;
  monthlyPayment: number;
  insurance: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreditCards {
  id: string;
  bank: string;
  cashPaymentCRC: number;
  cashPaymentUSD: number;
  interestAnual: number;
  interestMoratorium: number;
  minimumPaymentCRC: number;
  minimumPaymentUSD: number;
  creditCardFinances: ICreditCardFinance[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreditCardFinance {
  id: string;
  bank: string;
  interestRate?: number;
  interestMoratorium?: number;
  currency: string;
  interestAnual: number;
  balance: number;
  monthlyPayment: number;
  insurance: number;
  creditCardId: string;
  creditCards: ICreditCards;
  createdAt: Date;
  updatedAt: Date;
}

export enum PAYMENT_TYPE {
  CREDIT_CARD = 'CREDIT_CARD',
  SINPE = 'SINPE',
  BANK_TRANSFER = 'BANK_TRANSFER',
  AUTOMATIC_DEBIT = 'AUTOMATIC_DEBIT',
}

export enum IBILL_CATEGORY {
  TRANSPORTATION = 'TRANSPORTATION',
  GIFTS = 'GIFTS',
  HEALTH = 'HEALTH',
  SAVINGS = 'SAVINGS',
  EDUCATION = 'EDUCATION',
  DOG = 'DOG',
  FOOD = 'FOOD',
  SERVICES = 'SERVICES',
  HOUSE = 'HOUSE',
  RESPONSABILITY = 'RESPONSABILITY',
  OTHER = 'OTHER',
  FUN = 'FUN',
  FREELANCE = 'FREELANCE',
}

export enum IBILL_TYPE {
  MUST = 'MUST',
  DESIRE = 'DESIRE',
  SAVINGS = 'SAVINGS',
  FUN = 'FUN',
  FREELANCE = 'FREELANCE',
  OTHER = 'OTHER',
}

export enum IBILL_TYPE_TRANSLATION {
  MUST = 'Necesidad',
  DESIRE = 'Deseo',
  SAVINGS = 'Ahorro',
  FUN = 'Diversión',
  FREELANCE = 'Freelance',
  OTHER = 'Otro',
}

export enum ICURRENCY {
  USD = 'USD',
  CRC = 'CRC',
}

export enum IINCOME_CATEGORY {
  RENT = 'RENT',
  OTHER = 'OTHER',
  INSURANCE = 'INSURANCE',
  FREELANCE = 'FREELANCE',
  SALARY = 'SALARY',
}

export enum IINCOME_CATEGORY_TRANSLATION {
  RENT = 'Alquiler',
  INSURANCE = 'Seguro',
  FREELANCE = 'Freelance',
  SALARY = 'Salario',
  OTHER = 'Otro',
}

export interface IExpenseAmount {
  bill?: IBill;
  monthExpenseAmount?: number;
}
