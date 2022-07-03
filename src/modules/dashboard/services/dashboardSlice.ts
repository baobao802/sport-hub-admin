import { createSlice } from '@reduxjs/toolkit';

type InitialState = {};

const initialState: InitialState = {};

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
});

export default dashboardSlice.reducer;

// eslint-disable-next-line no-empty-pattern
export const {} = dashboardSlice.actions;
