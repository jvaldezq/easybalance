import dayjs from 'dayjs';

import { IExpense } from '@/lib/definitions';
import prisma from '@/lib/prisma';

export const fetchExpenseList = async () => {
  try {
    const startOfDay = dayjs().startOf('day').toDate();
    const endOfDay = dayjs().endOf('day').toDate();
    return (await prisma.expense.findMany({
      select: {
        id: true,
        amount: true,
        currency: true,
        paymentMethod: true,
        bill: {
          select: {
            name: true,
          },
        },
        description: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        createdAt: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    })) as IExpense[];
  } catch (error) {
    console.error('Error in fetchExpenseList service:', error);

    throw new Error(
      `Failed to create expense: ${error instanceof Error ? error.message : 'Unknown error'}`,
    );
  }
};
