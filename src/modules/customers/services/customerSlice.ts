import { createSlice } from '@reduxjs/toolkit';

type InitialState = {};

const initialState: InitialState = {};

export const customerSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {},
});

export default customerSlice.reducer;

// eslint-disable-next-line no-empty-pattern
export const {} = customerSlice.actions;
