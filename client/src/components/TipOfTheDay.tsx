import { useQuery } from '@apollo/client';
import { TIP_OF_THE_DAY } from '../utils/queries';

const TipOfTheDay = () => {
  const { loading, error, data } = useQuery(TIP_OF_THE_DAY);

  if (loading) return <p>Loading today's survival tip...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data?.tipOfTheDay) return <p>No tip available today</p>;

  return (
    <div className="card my-3">
      <div className="card-header bg-dark text-light">
        <h4>Zombie Survival Tip of the Day</h4>
      </div>
      <div className="card-body">
        <p><strong>Category:</strong> {data.tipOfTheDay.category}</p>
        <p>"{data.tipOfTheDay.text}"</p>
        <p className="text-right">— {data.tipOfTheDay.author}</p>
      </div>
    </div>
  );
};

export default TipOfTheDay;