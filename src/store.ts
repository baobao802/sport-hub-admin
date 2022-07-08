import { configureStore } from '@reduxjs/toolkit';
import appReducer from './services/appSlice';
import authReducer from './modules/auth/services/authSlice';
import customerReducer from './modules/customers/services/customerSlice';
import dashboardReducer from './modules/dashboard/services/dashboardSlice';
import { authApi } from './modules/auth/services/authApi';

const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    customers: customerReducer,
    dashboard: dashboardReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export default store;
