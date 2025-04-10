// Import the `useParams()` hook from React Router
import { useParams } from 'react-router-dom';
import { FC } from 'react';
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
    <div className="my-3">
      <h3 className="card-header bg-dark text-light p-2 m-0">
        {zombieblog.zombieblogAuthor} <br />
        <span style={{ fontSize: '1rem' }}>
          had this zombieblog on {new Date(Number(zombieblog.createdAt)).toLocaleString()}
        </span>
      </h3>
      <div className="bg-light py-4">
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
      </div>

      <div className="my-5">
        <CommentList comments={zombieblog.comments} />
      </div>
      <div className="m-3 p-4" style={{ border: '1px dotted #1a1a1a' }}>
        <CommentForm zombieblogId={zombieblog._id} />
      </div>
    </div>
  );
};

export default SingleZombieBlog;
