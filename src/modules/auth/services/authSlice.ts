import { createSlice } from '@reduxjs/toolkit';

type InitialState = {
  user: {
    id: string;
    email: string;
  } | null;
};

const initialState: InitialState = {
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
});

export default authSlice.reducer;

// eslint-disable-next-line no-empty-pattern
export const {} = authSlice.actions;

export const selectAuth = (state: { auth: InitialState }) => state.auth;
