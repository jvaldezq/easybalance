'use client';
import dayjs from 'dayjs';
import { usePathname, useRouter } from 'next/navigation';
import { useState, ChangeEvent, useEffect } from 'react';

interface FiltersProps {
  filters?: string;
}

export const Filters = (props: FiltersProps) => {
  const { filters } = props;
  const pathname = usePathname();
  const { replace } = useRouter();
  const [month, setMonth] = useState<string>(dayjs().format('YYYY-MM'));

  useEffect(() => {
    if (filters) {
      setMonth(JSON.parse(atob(filters)).month);
    }
  }, [filters]);

  const handleMonthChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMonth(event.target.value);
    const params = new URLSearchParams();
    const newFilters = JSON.stringify({
      month: event.target.value,
    });
    params.set('filters', btoa(newFilters));
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <section className="flex flex-col p-4">
      <label
        htmlFor="month-input"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Seleccionar Mes
      </label>
      <input
        id="month-input"
        type="month"
        name="month"
        onChange={handleMonthChange}
        value={month}
        placeholder="pepe"
        className="block w-full px-4 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out hover:border-gray-400"
      />
    </section>
  );
};
