import { useMutation } from '@tanstack/react-query';

import { api } from '@/lib/api';
import { IIncome } from '@/lib/definitions';

const createIncome = async (body: IIncome): Promise<IIncome> => {
  return await api.post('/income', body);
};

export const useCreateIncomeMutation = () => {
  return useMutation({
    mutationFn: (body: IIncome) => {
      return createIncome(body);
    },
    mutationKey: ['income-create'],
  });
};
