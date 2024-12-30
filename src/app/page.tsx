import { redirect } from 'next/navigation';

const Home = async () => {
  redirect('/stats');
};

export default Home;
