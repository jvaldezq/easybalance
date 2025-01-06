import dayjs from 'dayjs';

import { IExpenseAmount } from '@/lib/definitions';
import prisma from '@/lib/prisma';

export const fetchMonthExpenseAmount = async (billId: string) => {
  try {
    const startOfMonth = dayjs().startOf('month').toDate();
    const endOfMonth = dayjs().endOf('month').toDate();

    const bill = await prisma.bill.findUnique({
      select: {
        id: true,
        name: true,
        amount: true,
        accumulatedAmount: true,
        currency: true,
      },
      where: {
        id: billId,
      },
    });
    const expenseAmount = await prisma.expense.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        billId: billId,
        createdAt: {
          gte: startOfMonth,
          lte: endOfMonth,
        },
      },
    });

    return {
      bill,
      monthExpenseAmount: expenseAmount._sum.amount,
    } as IExpenseAmount;
  } catch (error) {
    console.error('Error in fetchExpenseList service:', error);

    throw new Error(
      `Failed to create expense: ${error instanceof Error ? error.message : 'Unknown error'}`,
    );
  }
};
