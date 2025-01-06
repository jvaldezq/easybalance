import { useMutation, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api';
import { IBill, IExpenseAmount } from '@/lib/definitions';

interface ICreateExpenseParams {
  billId: string;
}

const fetchBillList = async (): Promise<IBill[]> => {
  const res = await api.get('/bill');
  return res.data;
};

const fetchMonthExpenseAmount = async (
  params: ICreateExpenseParams,
): Promise<IExpenseAmount> => {
  const res = await api.get('/expense/month', {
    params: params,
  });
  return res.data;
};

const createExpense = async (body: IBill): Promise<IBill> => {
  return await api.post('/expense', body);
};

export const useBillListQuery = () => {
  return useQuery({
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    queryKey: ['bill-list'],
    queryFn: fetchBillList,
    retry: 2,
  });
};
export const useMonthExpenseAmountQuery = (params: ICreateExpenseParams) => {
  return useQuery({
    enabled: !!params.billId,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    queryKey: ['expense-amount', params?.billId],
    queryFn: () => fetchMonthExpenseAmount(params),
    retry: 2,
  });
};

export const useCreateExpenseMutation = () => {
  return useMutation({
    mutationFn: (body: IBill) => {
      return createExpense(body);
    },
    mutationKey: ['expense-create'],
  });
};
