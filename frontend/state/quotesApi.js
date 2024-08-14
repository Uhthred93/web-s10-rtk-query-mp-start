// create your RTK Query endpoints here
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const quotesApi = createApi({
    reducerPath: 'quotesApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:9009/api' }),
    tagTypes: ['Quotes'],
    endpoints: (builder) => ({
      getQuotes: builder.query({
        query: () => '/quotes',
        providesTags: (result = []) => [
          ...result.map(({ id }) => ({ type: 'Quotes', id })),
          { type: 'Quotes', id: 'LIST' },
        ],
      }),
      createQuote: builder.mutation({
        query: (newQuote) => ({
          url: '/quotes',
          method: 'POST',
          body: newQuote,
        }),
        invalidatesTags: [{ type: 'Quotes', id: 'LIST' }],
      }),
      deleteQuote: builder.mutation({
        query: (id) => ({
          url: `/quotes/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: (result, error, id) => [{ type: 'Quotes', id }],
      }),
      toggleFake: builder.mutation({
        query: ({ id, apocryphal }) => ({
          url: `/quotes/${id}`,
          method: 'PUT',
          body: { apocryphal },
        }),
        invalidatesTags: (result, error, { id }) => [{ type: 'Quotes', id }],
      }),
    }),
});

export const {
    useGetQuotesQuery,
    useCreateQuoteMutation,
    useDeleteQuoteMutation,
    useToggleFakeMutation,
} = quotesApi;