
import { useQuery } from '@apollo/client';
import { GET_ALL_POSTS } from '../utils/blogQueries';
import CommentForm from '../components/CommentForm';
import CommentList from '../components/CommentList';



const Blog = () => {
  const { loading, data } = useQuery(GET_ALL_POSTS);
  const posts = data?.getAllPosts || [];
  return (
    <main>
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
        <CommentForm />
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <CommentList
            comments={posts.comments}
            />  
            )}
          </div>
        </div>
      </main>
    );
};

export default Blog;

