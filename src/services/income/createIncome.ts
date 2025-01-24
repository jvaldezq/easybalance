import { ICURRENCY, IExpense, PAYMENT_TYPE } from '@/lib/definitions';
import prisma from '@/lib/prisma';

export const createIncome = async (body: IExpense) => {
  try {
    return await prisma.expense.create({
      data: {
        description: body?.description || null,
        currency: body?.currency || ICURRENCY.USD,
        amount: Number(body?.amount) || 0,
        paymentMethod: body?.paymentMethod || PAYMENT_TYPE.CREDIT_CARD,
        billId: body?.billId || '',
      },
    });
  } catch (error) {
    console.error('Error in createExpense service:', error);

    throw new Error(
      `Failed to create expense: ${error instanceof Error ? error.message : 'Unknown error'}`,
    );
  }
};
