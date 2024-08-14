import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setHighlightedQuote,
  toggleVisibility,
} from '../state/quotesSlice';
import {
  useGetQuotesQuery,
  useDeleteQuoteMutation,
  useToggleFakeMutation,
} from '../state/quotesApi';

export default function Quotes() {
  const { data: quotes = [], isLoading, isError, error } = useGetQuotesQuery();
  const [deleteQuote] = useDeleteQuoteMutation();
  const [toggleFake] = useToggleFakeMutation();

  const displayAllQuotes = useSelector((st) => st.quotesState.displayAllQuotes);
  const highlightedQuote = useSelector((st) => st.quotesState.highlightedQuote);
  const dispatch = useDispatch();

  if (isLoading) return <div>Loading quotes...</div>;
  if (isError) return <div>Error loading quotes: {error.message}</div>;

  return (
    <div id="quotes">
      <h3>Quotes</h3>
      <div>
        {quotes
          .filter((qt) => displayAllQuotes || !qt.apocryphal)
          .map((qt) => (
            <div
              key={qt.id}
              className={`quote${qt.apocryphal ? ' fake' : ''}${
                highlightedQuote === qt.id ? ' highlight' : ''
              }`}
            >
              <div>{qt.quoteText}</div>
              <div>{qt.quoteAuthor}</div>
              <div className="quote-buttons">
                <button onClick={() => deleteQuote(qt.id)}>DELETE</button>
                <button onClick={() => dispatch(setHighlightedQuote(qt.id))}>
                  HIGHLIGHT
                </button>
                <button
                  onClick={() =>
                    toggleFake({ id: qt.id, apocryphal: !qt.apocryphal })
                  }
                >
                  {qt.apocryphal ? 'UNMARK AS FAKE' : 'MARK AS FAKE'}
                </button>
              </div>
            </div>
          ))}
        {!quotes.length && 'No quotes here! Go write some.'}
      </div>
      {!!quotes.length && (
        <button onClick={() => dispatch(toggleVisibility())}>
          {displayAllQuotes ? 'HIDE' : 'SHOW'} FAKE QUOTES
        </button>
      )}
    </div>
  );
}