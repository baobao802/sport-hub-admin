import { configureStore } from '@reduxjs/toolkit';
import appReducer from './services/appSlice';
import dashboardReducer from './modules/dashboard/services/dashboardSlice';
import { authApi } from './modules/auth/services/authApi';
import { hubApi } from './modules/hubs/services/hubApi';
import { bookingApi } from './modules/bookings/services/bookingApi';
import { placeApi } from './services/placeApi';

const store = configureStore({
  reducer: {
    app: appReducer,
    dashboard: dashboardReducer,
    [authApi.reducerPath]: authApi.reducer,
    [hubApi.reducerPath]: hubApi.reducer,
    [bookingApi.reducerPath]: bookingApi.reducer,
    [placeApi.reducerPath]: placeApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      hubApi.middleware,
      bookingApi.middleware,
      placeApi.middleware,
    ),
});

export default store;
