import { redirect } from 'next/navigation';

const Home = async () => {
  redirect('/expense');
};

export default Home;
