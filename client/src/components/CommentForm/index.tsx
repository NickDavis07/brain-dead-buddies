import { useState, type FormEvent, type ChangeEvent } from 'react';
import { useMutation } from '@apollo/client';

import { ADD_COMMENT } from '../../utils/mutations';

const CommentForm = ({ zombieblogId }: any) => {
  const [commentText, setCommentText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  const [addComment, { error }] = useMutation(ADD_COMMENT);

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();
    console.log('zombieblogId', zombieblogId);

    try {
      await addComment({
        variables: {
          zombieblogId,
          commentText,
        },
      });

      setCommentText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    if (name === 'commentText' && value.length <= 280) {
      setCommentText(value);
      setCharacterCount(value.length);
    }
  };

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
        <h4
          className="text-center text-red-600"
          style={{
            textShadow:
              '2px 2px 0px black, -2px -2px 0px black, 2px -2px 0px black, -2px 2px 0px black',
          }}
        >
          What are your thoughts on this zombieblog?
        </h4>
      </div>
      <div
        className="p-4"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          borderBottomLeftRadius: '13px',
          borderBottomRightRadius: '13px',
        }}
      >
        <p
          className={`m-0 ${
            characterCount === 280 || error ? 'text-red-600' : 'text-light'
          }`}
        >
          Character Count: {characterCount}/280
          {error && (
            <span className="ml-2 text-red-600">Something went wrong...</span>
          )}
        </p>
        <form
          className="flex flex-col space-y-4"
          onSubmit={handleFormSubmit}
        >
          <textarea
            name="commentText"
            placeholder="Add your comment..."
            value={commentText}
            className="form-input w-full p-2"
            style={{
              lineHeight: '1.5',
              borderRadius: '10px',
              border: '1px solid #3d9a40',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
            }}
            onChange={handleChange}
          />
          <button
            className="btn btn-primary py-2"
            style={{
              backgroundColor: '#2c3e50',
              color: 'white',
              border: '1px solid #3d9a40',
              borderRadius: '5px',
              fontWeight: 'bold',
              transition: 'background-color 0.3s',
            }}
            type="submit"
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = '#34495e')
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = '#2c3e50')
            }
          >
            Add Comment
          </button>
        </form>
      </div>
    </div>
  );
};

export default CommentForm;
