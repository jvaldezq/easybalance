import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { IExpenseAmount } from '@/lib/definitions';
import prisma from '@/lib/prisma';

dayjs.extend(utc);

export const fetchMonthExpenseAmount = async (billId: string) => {
  try {
    // Convert Costa Rica time (UTC -6) to GMT (UTC)
    const startOfDayInCostaRica = dayjs()
      .utc()
      .subtract(6, 'hours')
      .startOf('month');
    const endOfDayInCostaRica = dayjs()
      .utc()
      .subtract(6, 'hours')
      .endOf('month');

    // Convert those to GMT by adding 6 hours to the Costa Rica time
    const startOfDayInGMT = startOfDayInCostaRica.add(6, 'hours').toDate();
    const endOfDayInGMT = endOfDayInCostaRica.add(6, 'hours').toDate();

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
          gte: startOfDayInGMT,
          lte: endOfDayInGMT,
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
