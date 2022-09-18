import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const emptySplitApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: '/',
    prepareHeaders: (headers) => {
      headers.append('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: [],
  endpoints: () => ({}),
});
