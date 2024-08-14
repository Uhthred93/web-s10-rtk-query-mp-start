import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  displayAllQuotes: true,
  highlightedQuote: null,
};

export const quotesSlice = createSlice({
  name: 'quotes',
  initialState,
  reducers: {
    toggleVisibility(state) {
      state.displayAllQuotes = !state.displayAllQuotes;
    },
    setHighlightedQuote(state, action) {
      state.highlightedQuote = state.highlightedQuote === action.payload
        ? null
        : action.payload;
    },
  }
});

export const {
  setHighlightedQuote,
  toggleVisibility,
} = quotesSlice.actions;

export default quotesSlice.reducer;