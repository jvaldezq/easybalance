import Link from 'next/link';

const Config = async () => {
  return (
    <section className="max-w-screen-lg mx-auto py-2 grid grid-cols-2 gap-4 my-8">
      <Link
        className="flex items-center justify-center shadow-2xl p-4"
        href="/config/bill"
      >
        Gastos
      </Link>
    </section>
  );
};

export default Config;
