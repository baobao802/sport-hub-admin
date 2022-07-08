import { createSlice } from '@reduxjs/toolkit';
import { User } from '../types';

type InitialState = {
  user: User | null;
};

type Payload = {
  payload: User;
};

const authStorage = localStorage.getItem('SPORT_HUB_AUTH');

const initialState: InitialState = {
  user: authStorage ? JSON.parse(authStorage) : null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, { payload }: Payload) => {
      const user = {
        id: payload.id,
        email: payload.email,
      };
      state.user = user;
      localStorage.setItem('SPORT_HUB_AUTH', JSON.stringify(user));
    },
  },
});

export default authSlice.reducer;

// eslint-disable-next-line no-empty-pattern
export const { setCredentials } = authSlice.actions;

export const selectAuth = (state: { auth: InitialState }) => state.auth;
