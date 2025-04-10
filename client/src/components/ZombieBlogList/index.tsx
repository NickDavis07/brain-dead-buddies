import { Link } from 'react-router-dom';
import React from 'react';

interface ZombieBlog {
  _id: string;
  zombieblogText: string;
  zombieblogAuthor: string;
  createdAt: string;
}

interface ZombieBlogListProps {
  zombieblogs: ZombieBlog[];
  title: string;
}

const ZombieBlogList: React.FC<ZombieBlogListProps> = ({ zombieblogs, title }) => {
  if (!zombieblogs.length) {
    return <h3 className="text-center text-red-600 font-bold">No Zombie Blogs Yet</h3>;
  }

  return (
    <div>
      <h3 className="text-xl font-bold text-center text-red-600 mb-4">{title}</h3>
      {zombieblogs?.map((zombieblog) => (
        <div
          key={zombieblog._id}
          className="mb-4 p-4 rounded-lg border-2 border-green-600 bg-gray-800 text-white"
        >
          <h4 className="text-lg font-bold text-green-400 mb-2">
            {zombieblog.zombieblogAuthor}
            <br />
            <span className="text-sm text-gray-400">
              had this zombieblog on {new Date(zombieblog.createdAt).toLocaleString()}
            </span>
          </h4>
          <div className="mb-2">
            <p>{zombieblog.zombieblogText}</p>
          </div>
          <Link
            className="block text-center bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            to={`/zombieblogs/${zombieblog._id}`}
          >
            Dive into the conversation about this zombieblog.
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ZombieBlogList;
