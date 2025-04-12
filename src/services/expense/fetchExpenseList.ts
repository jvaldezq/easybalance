import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

import prisma from '@/lib/prisma';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isBetween);

interface Props {
  billId?: string;
}

export const fetchYearlyExpensesByBillId = async (props: Props) => {
  try {
    const { billId } = props;
    const now = dayjs().tz('America/Costa_Rica');
    const yearStart = now.startOf('year').toDate();
    const yearEnd = now.endOf('year').toDate();

    // Get all expenses for the given billId and current year
    const expenses = await prisma.expense.findMany({
      where: {
        billId,
        createdAt: {
          gte: yearStart,
          lte: yearEnd,
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    // Initialize months map
    const monthlyExpenses: Record<string, typeof expenses> = {};

    for (let i = 0; i < 12; i++) {
      const monthKey = dayjs().month(i).format('MMMM'); // e.g., "January"
      monthlyExpenses[monthKey] = [];
    }

    // Group expenses by month
    expenses.forEach((expense) => {
      const localDate = dayjs(expense.createdAt).tz('America/Costa_Rica');
      const monthKey = localDate.format('MMMM');
      if (!monthlyExpenses[monthKey]) {
        monthlyExpenses[monthKey] = [];
      }
      monthlyExpenses[monthKey].push(expense);
    });

    return monthlyExpenses;
  } catch (error) {
    console.error('Error in fetchYearlyExpensesByBillId:', error);
    throw new Error(
      `Failed to fetch expenses: ${error instanceof Error ? error.message : 'Unknown error'}`,
    );
  }
};
