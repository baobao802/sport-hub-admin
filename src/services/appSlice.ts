import { createSlice } from '@reduxjs/toolkit';

type InitialState = {
  lang: string;
};

const initialState: InitialState = {
  lang: 'en',
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLang: (state, action) => {
      state.lang = action.payload;
    },
  },
});

export default appSlice.reducer;

export const { setLang } = appSlice.actions;

export const selectLang = (state: { app: InitialState }) => state.app.lang;
