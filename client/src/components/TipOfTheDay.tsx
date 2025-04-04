import { useQuery } from '@apollo/client';
import { TIP_OF_THE_DAY } from '../utils/queries';

const TipOfTheDay = () => {
  const { loading, error, data } = useQuery(TIP_OF_THE_DAY);

  if (loading) return <p>Loading today's survival tip...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data?.tipOfTheDay) return <p>No tip available today</p>;

  return (
    <div className="card my-3" style={{ 
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      borderRadius: '15px',
      border: '2px solid #3d9a40'
    }}>
      <div className="card-header bg-dark text-light" style={{ 
        borderTopLeftRadius: '13px', 
        borderTopRightRadius: '13px',
        backgroundColor: 'rgba(33, 37, 41, 0.8)'
      }}>
        <h4>Zombie Survival Tip of the Day</h4>
      </div>
      <div className="card-body" style={{ 
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        borderBottomLeftRadius: '13px', 
        borderBottomRightRadius: '13px'
      }}>
        <p><strong style={{ color: '#4eca54' }}>Category:</strong> <span style={{ color: '#fff' }}>{data.tipOfTheDay.category}</span></p>
        <p style={{ 
          color: '#fff',
          fontStyle: 'italic',
          borderLeft: '3px solid #3d9a40',
          paddingLeft: '10px',
          margin: '15px 0'
        }}>"{data.tipOfTheDay.text}"</p>
        <p className="text-right" style={{ color: '#e0e0e0' }}>— {data.tipOfTheDay.author}</p>
      </div>
    </div>
  );
};

export default TipOfTheDay;