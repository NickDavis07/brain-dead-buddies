import TipOfTheDay from '../components/TipOfTheDay';

const Home = () => {
  return (
    <main>
      <div className="flex-row justify-center">
        {/* Add the Tip of the Day component at the top */}
        <TipOfTheDay />
      </div>
    </main>
  );
};

export default Home;