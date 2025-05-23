import { useQuery } from '@apollo/client';

import ZombieBlogList from '../components/ZombieBlogList/index.tsx';
import ZombieBlogForm from '../components/ZombieBlogForm/index.tsx';

import { QUERY_ZOMBIEBLOGS } from '../utils/queries.ts';

const Home = () => {
  const { loading, data } = useQuery(QUERY_ZOMBIEBLOGS);
  const zombieblogs = data?.zombieblogs || [];

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
            Zombie Blog
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
            <ZombieBlogForm />
          </div>
          <div>
            {loading ? (
              <div>Loading...</div>
            ) : (
              <ZombieBlogList
                zombieblogs={zombieblogs}
                title="Unleash Your Ideas in the Zombie Blog Feed!"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
