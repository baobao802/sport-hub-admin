import { createApi } from '@reduxjs/toolkit/query/react';
import { customFetchBase } from 'src/utils/redux';
import { BookingResponse, RequestParams } from '../types';
import { bookingsResponseMapper } from '../utils';

export const bookingApi = createApi({
  reducerPath: 'bookingApi',
  baseQuery: customFetchBase,
  endpoints: (builder) => ({
    getAllHistory: builder.query<BookingResponse, RequestParams>({
      query: (params) => ({
        url: '/bookings/my-history',
        params,
      }),
      transformResponse: (res: any) => bookingsResponseMapper(res),
    }),
  }),
});

export const { useGetAllHistoryQuery } = bookingApi;
