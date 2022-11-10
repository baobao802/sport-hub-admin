import { createApi } from '@reduxjs/toolkit/query/react';
import { customFetchBase } from 'src/utils/redux';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: customFetchBase,
  endpoints: (builder) => ({
    authenticate: builder.query({
      query: () => ({
        url: '/auth/authenticate',
      }),
    }),
    login: builder.mutation({
      query: (payload) => ({
        url: '/auth/login',
        method: 'POST',
        body: payload,
      }),
    }),
    signup: builder.mutation({
      query: (payload) => ({
        url: '/auth/register',
        method: 'POST',
        body: payload,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
    }),
    updateUserInfo: builder.mutation({
      query: ({ payload }) => ({
        url: '/account/info',
        method: 'PATCH',
        body: payload,
      }),
      async onQueryStarted({ payload }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          authApi.util.updateQueryData('authenticate', {}, (draft) => {
            Object.assign(draft, payload);
          }),
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    updatePassword: builder.mutation({
      query: ({ payload }) => ({
        url: '/account/password',
        method: 'PATCH',
        body: {
          newPassword: payload.newPassword,
        },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useSignupMutation,
  useAuthenticateQuery,
  useUpdateUserInfoMutation,
  useUpdatePasswordMutation,
} = authApi;
