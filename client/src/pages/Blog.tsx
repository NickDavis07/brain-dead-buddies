import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { GET_ALL_POSTS } from '../utils/blogQueries';

const Blog = () => {
  const { loading, data } = useQuery(GET_ALL_POSTS);

  return (
    <div className="zombie-blog-container p-4" style={{ 
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      minHeight: 'calc(100vh - 200px)'
    }}>
      <h2 className="text-center text-red-500 mb-4" style={{ 
        textShadow: '2px 2px 4px #000',
        fontSize: '2.5rem'
      }}>
        Survival Stories
      </h2>
      
      {Auth.loggedIn() && (
        <Link 
          to="/blog/new" 
          className="btn btn-danger mb-4"
          style={{
            backgroundColor: '#8b0000',
            borderColor: '#ff0000'
          }}
        >
          + New Post
        </Link>
      )}

      {loading ? (
        <div className="text-center text-gray-300">Loading zombie knowledge...</div>
      ) : (
        <div className="row">
          {data?.getAllPosts.map((post: any) => (
            <div key={post._id} className="col-md-6 mb-4">
              <div className="card bg-dark text-light h-100" style={{ 
                border: '2px solid #3d9a40',
                borderRadius: '10px'
              }}>
                <div className="card-body">
                  <h5 className="card-title text-green-400">{post.title}</h5>
                  <p className="card-text text-gray-300">{post.content.substring(0, 100)}...</p>
                  <Link 
                    to={`/blog/${post._id}`} 
                    className="btn btn-sm btn-outline-danger"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Blog;