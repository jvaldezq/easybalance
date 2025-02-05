import {
  IBILL_CATEGORY,
  PAYMENT_TYPE,
  IBILL_TYPE,
  ICURRENCY,
} from '@/lib/definitions';

export const PAYMENT_METHODS = [
  {
    id: PAYMENT_TYPE.CREDIT_CARD,
    name: 'Tarjeta de crédito',
  },
  {
    id: PAYMENT_TYPE.SINPE,
    name: 'SINPE',
  },
  {
    id: PAYMENT_TYPE.BANK_TRANSFER,
    name: 'Transferencia bancaria',
  },
  {
    id: PAYMENT_TYPE.AUTOMATIC_DEBIT,
    name: 'Débito automático',
  },
];

export const CURRENCIES = [
  { id: ICURRENCY.CRC, name: '₡' },
  { id: ICURRENCY.USD, name: '$' },
];

export const BILL_CATEGORY = [
  {
    id: IBILL_CATEGORY.TRANSPORTATION,
    name: 'Transporte',
  },
  {
    id: IBILL_CATEGORY.GIFTS,
    name: 'Regalos',
  },
  {
    id: IBILL_CATEGORY.HEALTH,
    name: 'Salud',
  },
  {
    id: IBILL_CATEGORY.SAVINGS,
    name: 'Ahorros',
  },
  {
    id: IBILL_CATEGORY.EDUCATION,
    name: 'Educación',
  },
  {
    id: IBILL_CATEGORY.EDUCATION,
    name: 'Educación',
  },
  {
    id: IBILL_CATEGORY.DOG,
    name: 'Perro',
  },
  {
    id: IBILL_CATEGORY.FOOD,
    name: 'Comida',
  },
  {
    id: IBILL_CATEGORY.SERVICES,
    name: 'Servicios',
  },
  {
    id: IBILL_CATEGORY.HOUSE,
    name: 'Hogar',
  },
  {
    id: IBILL_CATEGORY.RESPONSABILITY,
    name: 'Responsabilidad',
  },
  {
    id: IBILL_CATEGORY.OTHER,
    name: 'Otro',
  },
  {
    id: IBILL_CATEGORY.FUN,
    name: 'Diversión',
  },
  {
    id: IBILL_CATEGORY.FREELANCE,
    name: 'Freelance',
  },
];

export const BILL_TYPES = [
  {
    id: IBILL_TYPE.MUST,
    name: 'Obligatorio',
  },
  {
    id: IBILL_TYPE.DESIRE,
    name: 'Deseo',
  },
  {
    id: IBILL_TYPE.SAVINGS,
    name: 'Ahorro',
  },
  {
    id: IBILL_TYPE.FUN,
    name: 'Diversión',
  },
  {
    id: IBILL_TYPE.OTHER,
    name: 'Otro',
  },
];
