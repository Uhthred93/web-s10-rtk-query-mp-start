import React, { useReducer } from 'react';
import { useCreateQuoteMutation } from '../state/quotesApi'; 

const CHANGE_INPUT = 'CHANGE_INPUT';
const RESET_FORM = 'RESET_FORM';

const initialState = {
  authorName: '',
  quoteText: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case CHANGE_INPUT: {
      const { name, value } = action.payload;
      return { ...state, [name]: value };
    }
    case RESET_FORM:
      return { authorName: '', quoteText: '' };
    default:
      return state;
  }
};

export default function QuoteForm() { 
  const [state, dispatch] = useReducer(reducer, initialState);
  const [createQuote, { isLoading, error }] = useCreateQuoteMutation(); 

  const onChange = ({ target: { name, value } }) => {
    dispatch({ type: CHANGE_INPUT, payload: { name, value } });
  };

  const resetForm = () => {
    dispatch({ type: RESET_FORM });
  };

  const onNewQuote = async (evt) => {
    evt.preventDefault();
    try {
      await createQuote({
        quoteAuthor: state.authorName,
        quoteText: state.quoteText,
      }).unwrap(); 
      resetForm(); 
    } catch (error) {
      console.error('Failed to create quote:', error); 
      console.error('Server response:', error.data);
    }
  };

  return (
    <form id="quoteForm" onSubmit={onNewQuote}>
      <h3>New Quote Form</h3>
      <label>
        <span>Author:</span>
        <input
          type="text"
          name="authorName"
          placeholder="type author name"
          onChange={onChange}
          value={state.authorName}
        />
      </label>
      <label>
        <span>Quote text:</span>
        <textarea
          type="text"
          name="quoteText"
          placeholder="type quote"
          onChange={onChange}
          value={state.quoteText}
        />
      </label>
      <label>
        <span>Create quote:</span>
        <button
          type="submit"
          disabled={!state.authorName.trim() || !state.quoteText.trim() || isLoading}
        >
          {isLoading ? 'Submitting...' : 'DO IT!'}
        </button>
      </label>
      {error && (
        <div>
          <p>Error creating quote: {error.data?.message || 'An unexpected error occurred'}</p>
          {error.data?.errors && (
            <ul>
              {Object.entries(error.data.errors).map(([field, message]) => (
                <li key={field}>{message}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </form>
  );
}