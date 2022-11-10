import { createSlice } from '@reduxjs/toolkit';
import { Notification } from 'src/types';

type InitialState = {
  lang: string;
  notifications: Notification[];
};

const initialState: InitialState = {
  lang: 'en',
  notifications: [],
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLang: (state, action) => {
      state.lang = action.payload;
    },
    setNotifications: (state, action) => {
      state.notifications = action.payload;
    },
  },
});

export default appSlice.reducer;

export const { setLang, setNotifications } = appSlice.actions;

export const selectLang = (state: { app: InitialState }) => state.app.lang;
export const selectNotifications = (state: { app: InitialState }) =>
  state.app.notifications;
