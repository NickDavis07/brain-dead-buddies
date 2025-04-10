import { type ChangeEvent, type FormEvent, useState } from 'react';
import { useMutation } from '@apollo/client';

import { ADD_THOUGHT } from '../../utils/mutations';
import { QUERY_THOUGHTS } from '../../utils/queries';

const ThoughtForm = () => {
  const [formState, setFormState] = useState({
    thoughtText: '',
    thoughtAuthor: '',
  });
  const [characterCount, setCharacterCount] = useState(0);

  // Set up the mutation with error handling support.
  // The useMutation hook allows providing the refetchQueries option to refetch specific queries after a mutation
  // This is useful to ensure that new data is displayed automatically. Otherwise, we would need to manually update the list at a higher component level, modify state, or implement custom caching behavior
  const [addThought, { error }] = useMutation
  (ADD_THOUGHT, {
    refetchQueries: [
      QUERY_THOUGHTS,
      'getThoughts'
    ]
  });

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();

    // Perform the mutation and pass the form data object as arguments when the form is submitted.
    // Make sure that the object fields match the defined parameters in the ADD_THOUGHT mutation.
    try {
      await addThought({
        variables: { ...formState },
      });

      // Instead of refreshing the page, the query dispatched at the src/pages/Home.jsx level is refetched, allowing the updated data to be passed down to the ThoughtList component for display. Then, we can directly clear the form state.
      setCharacterCount(0);
      setFormState({
        thoughtText: '',
        thoughtAuthor: ''
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === 'thoughtText' && value.length <= 280) {
      setFormState({ ...formState, [name]: value });
      setCharacterCount(value.length);
    } else if (name !== 'thoughtText') {
      setFormState({ ...formState, [name]: value });
    }
  };

  return (
    <div>
      <h3>What's on your techy mind?</h3>

      <p
        className={`m-0 ${
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
            name="thoughtText"
            placeholder="Here's a new thought..."
            value={formState.thoughtText}
            className="form-input w-100"
            onChange={handleChange}
          />
        </div>
        <div className="col-12 col-lg-9">
          <input
            name="thoughtAuthor"
            placeholder="Add your name to get credit for the thought..."
            value={formState.thoughtAuthor}
            className="form-input w-100"
            onChange={handleChange}
          />
        </div>

        <div className="col-12 col-lg-3">
          <button className="btn btn-primary btn-block py-3" type="submit">
            Add Thought
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

export default ThoughtForm;
