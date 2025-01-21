import { CreateExpense } from '@/app/expense/new/form/CreateExpense';

const NewBills = async () => {
  return (
    <section className="max-w-screen-sm mx-auto px-4 mt-16">
      <CreateExpense />
    </section>
  );
};

export default NewBills;
