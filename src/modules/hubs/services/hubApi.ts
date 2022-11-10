import { createApi } from '@reduxjs/toolkit/query/react';
import { customFetchBase } from 'src/utils/redux';
import { hubDetailsResponseMapper, hubResponseMapper } from '../utils';
import qs from 'query-string';
import { RequestParams } from '../types';

export const hubApi = createApi({
  reducerPath: 'hubApi',
  baseQuery: customFetchBase,
  endpoints: (builder) => ({
    getHubs: builder.query({
      query: (params: RequestParams) => {
        const searchParams = qs.stringify({ ...params });
        return `/hubs?${searchParams}`;
      },
      transformResponse: (res: any) => hubResponseMapper(res),
    }),
    getMyHub: builder.query({
      query: () => {
        return `/hubs/mine`;
      },
      transformResponse: (res: any) => hubDetailsResponseMapper(res),
    }),
    createMyHub: builder.mutation({
      query: ({ payload }) => ({
        url: `/hubs`,
        method: 'POST',
        body: payload,
      }),
    }),
    updateMyHub: builder.mutation({
      query: ({ payload }) => ({
        url: `/hubs/mine`,
        method: 'PATCH',
        body: payload,
      }),
    }),
    createPitch: builder.mutation({
      query: ({ payload }) => ({
        url: `/hubs/mine/pitches`,
        method: 'POST',
        body: payload,
      }),
    }),
    updatePitchById: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/pitches/${id}`,
        method: 'PATCH',
        body: payload,
      }),
    }),
  }),
});

export const {
  useGetHubsQuery,
  useGetMyHubQuery,
  useLazyGetMyHubQuery,
  useCreateMyHubMutation,
  useUpdateMyHubMutation,
  useCreatePitchMutation,
  useUpdatePitchByIdMutation,
} = hubApi;
