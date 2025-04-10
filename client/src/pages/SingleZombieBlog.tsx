// Import the `useParams()` hook from React Router
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import CommentList from '../components/CommentList/index.tsx';
import CommentForm from '../components/CommentForm/index.tsx';

import { QUERY_SINGLE_ZOMBIEBLOG } from '../utils/queries.ts';

interface ZombieBlog {
  _id: string;
  createdAt: string;
  zombieblogText: string;
  zombieblogAuthor: string;
  comments: Array<{ _id: string; commentText: string; createdAt: string; username: string }>;
}

const SingleZombieBlog = () => {
  const { zombieblogId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_ZOMBIEBLOG, {
    variables: { zombieblogId: zombieblogId },
  });

  const zombieblog: ZombieBlog = data?.zombieblog || ({} as ZombieBlog);

  if (loading) {
    return <div>Loading...</div>;
  }
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
          <h3
            className="text-2xl font-bold text-center text-red-600"
            style={{
              textShadow: '2px 2px 0px black, -2px -2px 0px black, 2px -2px 0px black, -2px 2px 0px black',
            }}
          >
            {zombieblog.zombieblogAuthor} <br />
            <span style={{ fontSize: '1rem' }}>
              had this zombieblog on {new Date(Number(zombieblog.createdAt)).toLocaleString()}
            </span>
          </h3>
        </div>
        <div
          className="p-4"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            borderBottomLeftRadius: '13px',
            borderBottomRightRadius: '13px',
          }}
        >
          <blockquote
            className="p-4"
            style={{
              fontSize: '1.5rem',
              fontStyle: 'italic',
              border: '2px dotted #1a1a1a',
              lineHeight: '1.5',
            }}
          >
            {zombieblog.zombieblogText}
          </blockquote>
          <div className="my-5">
            <CommentList comments={zombieblog.comments} />
          </div>
          <div className="m-3 p-4" style={{ border: '1px dotted #1a1a1a' }}>
            <CommentForm zombieblogId={zombieblog._id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleZombieBlog;
