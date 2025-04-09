import React from 'react';
import categoryData from '../../../server/src/seeds/categoryData.json'; // Adjust the path accordingly

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

  return (
    <React.Fragment>
      <h3
        className="p-5 display-inline-block"
        style={{ borderBottom: '1px dotted #1a1a1a' }}
      >
        Comments
      </h3>
      <div className="flex-row my-4">
        {comments.map((comment: Comment) => (
          <div key={comment._id} className="col-12 mb-3 pb-3">
            <div className="p-3 bg-dark text-light">
              <h5 className="card-header">An anonymous user commented</h5>
              <p className="card-text">{comment.commentText}</p>
            </div>
          </div>
        ))}
      </div>
      <h3
        className="p-5 display-inline-block"
        style={{ borderBottom: '1px dotted #1a1a1a' }}
      >
        Categories
      </h3>
      <div className="flex-row my-4">
        {categoryData.map((category: any, index: number) => (
          <div key={index} className="col-12 mb-3 pb-3">
            <div className="p-3 bg-light text-dark">
              <h5 className="card-header">{category.name}</h5>
              <p className="card-text">{category.description}</p>
            </div>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};

export default CommentList;