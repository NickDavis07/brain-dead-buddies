import { type ChangeEvent, type FormEvent, useState } from 'react';
import { useMutation } from '@apollo/client';

import { ADD_ZOMBIEBLOG } from '../../utils/mutations';
import { QUERY_ZOMBIEBLOGS } from '../../utils/queries';

const ZombieBlogForm = () => {
  const [formState, setFormState] = useState({
    zombieblogText: '',
    zombieblogAuthor: '',
  });
  const [characterCount, setCharacterCount] = useState(0);

  const [addZombieBlog, { error }] = useMutation(ADD_ZOMBIEBLOG, {
    refetchQueries: [
      QUERY_ZOMBIEBLOGS,
      'getZombieBlogs'
    ]
  });

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      await addZombieBlog({
        variables: { ...formState },
      });

      setCharacterCount(0);
      setFormState({
        zombieblogText: '',
        zombieblogAuthor: ''
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === 'zombieblogText' && value.length <= 280) {
      setFormState({ ...formState, [name]: value });
      setCharacterCount(value.length);
    } else if (name !== 'zombieblogText') {
      setFormState({ ...formState, [name]: value });
    }
  };

  return (
    <div>
      <h3 className="text-white">What's your survival story today?</h3>

      <p
        className={`m-0 text-white ${
          characterCount === 280 || error ? 'text-danger' : ''
        }`}
      >
        Character Count: {characterCount}/280
        {error && <span className="ml-2">Something went wrong...</span>}
      </p>
      <form
        className="flex-row justify-center justify-space-between-md align-center"
        onSubmit={handleFormSubmit}
      >
        <div className="col-12">
          <textarea
            name="zombieblogText"
            placeholder="Pen down your undead musings here..."
            value={formState.zombieblogText}
            className="form-input w-100"
            onChange={handleChange}
          />
        </div>
        <div className="col-12 col-lg-9">
          <input
            name="zombieblogAuthor"
            placeholder="Share your name to claim this zombie blog as yours..."
            value={formState.zombieblogAuthor}
            className="form-input w-100"
            onChange={handleChange}
          />
        </div>
        <div className="col-12 col-lg-3">
          <button className="btn btn-primary btn-block py-3" type="submit">
            Add New Post
          </button>
        </div>
        {error && (
          <div className="col-12 my-3 bg-danger text-white p-3">
            Something went wrong...
          </div>
        )}
      </form>
    </div>
  );
};

export default ZombieBlogForm;
