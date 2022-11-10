import { createSlice } from '@reduxjs/toolkit';

type InitialState = {};

const initialState: InitialState = {};

export const hubSlice = createSlice({
  name: 'hubs',
  initialState,
  reducers: {},
});

export default hubSlice.reducer;

// eslint-disable-next-line no-empty-pattern
export const {} = hubSlice.actions;
