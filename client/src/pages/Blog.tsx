import { useQuery } from '@apollo/client';

import ThoughtList from '../components/ThoughtList/index.tsx';
import ThoughtForm from '../components/ThoughtForm/index.tsx';

import { QUERY_THOUGHTS } from '../utils/queries.ts';

const Home = () => {
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  const thoughts = data?.thoughts || [];

  return (
    <div className="container mx-auto p-4" style={{ maxWidth: '800px' }}>
      <div
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          borderRadius: '15px',
          border: '2px solid #3d9a40',
        }}
      >
        <div
          className="text-light p-3 bg-gray-900"
          style={{
            borderTopLeftRadius: '13px',
            borderTopRightRadius: '13px',
          }}
        >
          <h1
            className="text-2xl font-bold text-center text-red-600"
            style={{
              textShadow:
                '2px 2px 0px black, -2px -2px 0px black, 2px -2px 0px black, -2px 2px 0px black',
            }}
          >
            Blog
          </h1>
        </div>

        <div
          className="p-4"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            borderBottomLeftRadius: '13px',
            borderBottomRightRadius: '13px',
          }}
        >
          <div className="mb-4">
            <ThoughtForm />
          </div>
          <div>
            {loading ? (
              <div>Loading...</div>
            ) : (
              <ThoughtList
                thoughts={thoughts}
                title="Some Feed for Thought(s)..."
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
