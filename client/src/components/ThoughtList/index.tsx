import { Link } from 'react-router-dom';
import React from 'react';

interface Thought {
  _id: string;
  thoughtText: string;
  thoughtAuthor: string;
  createdAt: string;
}

interface ThoughtListProps {
  thoughts: Thought[];
  title: string;
}

const ThoughtList: React.FC<ThoughtListProps> = ({ thoughts, title }) => {
  if (!thoughts.length) {
    return <h3 className="text-center text-red-600 font-bold">No Thoughts Yet</h3>;
  }

  return (
    <div>
      <h3 className="text-xl font-bold text-center text-red-600 mb-4">{title}</h3>
      {thoughts?.map((thought) => (
        <div
          key={thought._id}
          className="mb-4 p-4 rounded-lg border-2 border-green-600 bg-gray-800 text-white"
        >
          <h4 className="text-lg font-bold text-green-400 mb-2">
            {thought.thoughtAuthor}
            <br />
            <span className="text-sm text-gray-400">
              had this thought on {new Date(thought.createdAt).toLocaleString()}
            </span>
          </h4>
          <div className="mb-2">
            <p>{thought.thoughtText}</p>
          </div>
          <Link
            className="block text-center bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            to={`/thoughts/${thought._id}`}
          >
            Join the discussion on this thought.
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ThoughtList;
