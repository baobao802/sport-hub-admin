import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LoginResponse } from '../types';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_API_URL}/auth`,
    prepareHeaders: (headers, api) => headers,
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (payload) => ({
        url: '/login',
        method: 'POST',
        body: payload,
      }),
      transformResponse: (res: LoginResponse) => res.user,
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/logout',
        method: 'POST',
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation } = authApi;
