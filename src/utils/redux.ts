import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query/fetchBaseQuery';
import { BaseQueryFn, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query';
import { Mutex } from 'async-mutex';

// Create a new mutex
const mutex = new Mutex();
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_BASE_API_URL,
  credentials: 'include',
});

export const customFetchBase: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();
  let res = await baseQuery(args, api, extraOptions);
  if ((res.error?.data as any)?.message === 'Token expired') {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();

      try {
        const refreshRes = await baseQuery(
          { credentials: 'include', url: 'auth/refresh-token' },
          api,
          extraOptions,
        );

        if (refreshRes) {
          // Retry the initial query
          res = await baseQuery(args, api, extraOptions);
        } else {
          window.location.href = '/login';
        }
      } finally {
        // release must be called once the mutex should be released again.
        release();
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock();
      res = await baseQuery(args, api, extraOptions);
    }
  }

  return res;
};
