import { BILL_CATEGORY } from '@/lib/constants';
import { IBill } from '@/lib/definitions';
import prisma from '@/lib/prisma';

const transformToCategories = (billList: IBill[]) => {
  const grouped = billList.reduce(
    (acc, bill: IBill) => {
      const { category } = bill;
      if (!acc[category || '']) {
        acc[category || ''] = [];
      }
      acc[category || ''].push(bill);
      return acc;
    },
    {} as Record<string, IBill[]>,
  );

  return Object.entries(grouped).map(([label, items]) => ({
    label: BILL_CATEGORY.find((cat) => cat.id === label)?.name || label,
    items,
  }));
};

export const fetchBillList = async () => {
  try {
    const res = await prisma.bill.findMany({
      select: {
        id: true,
        name: true,
        category: true,
        type: true,
      },
      where: {
        isPublic: true,
      },
    });
    return transformToCategories(res as IBill[]);
  } catch (error) {
    console.error('Error in createExpense service:', error);

    throw new Error(
      `Failed to create expense: ${error instanceof Error ? error.message : 'Unknown error'}`,
    );
  }
};
