import type React from 'react';
interface Comment {
  _id: string;
  createdAt: string;
  commentText: string;
}

interface CommentListProps {
  comments?: Comment[];
}

const CommentList: React.FC<CommentListProps> = ({ comments = [] }) => {
  console.log(comments);
  if (!comments.length) {
    return (
      <h3
        className="text-center text-red-600"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          padding: '10px',
          borderRadius: '10px',
          border: '2px solid #3d9a40',
          textShadow: '2px 2px 0px black, -2px -2px 0px black',
        }}
      >
        No Comments Yet
      </h3>
    );
  }

  return (
    <div
      className="container mx-auto p-4"
      style={{
        maxWidth: '800px',
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
          Comments
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
        <div className="flex-row my-4">
          {comments?.map((comment, index) => (
            <div
              key={comment._id || `comment-${index}`} // Fallback to index if _id is null or undefined
              className="col-12 mb-3 pb-3"
            >
              <div className="p-3 bg-dark text-light">
                <h5 className="card-header">
                  An anonymous user commented{' '}
                  <span style={{ fontSize: '0.825rem' }}>
                    on {new Date(Number(comment.createdAt)).toLocaleString()}
                  </span>
                </h5>
                <p className="card-body">{comment.commentText}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommentList;
