import { createApi } from '@reduxjs/toolkit/query/react';
import { City } from 'src/types';
import { customFetchBase } from 'src/utils/redux';

export const placeApi = createApi({
  reducerPath: 'placeApi',
  baseQuery: customFetchBase,
  endpoints: (builder) => ({
    getCities: builder.query<City[], any>({
      query: () => `/places/cities`,
    }),
  }),
});

export const { useGetCitiesQuery } = placeApi;
