import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface loggedStore {
  value: boolean;
}

const initialState: loggedStore = {
  value: false,
};

export const loggedStore = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setLogout: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
    setLogin: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
    loginStatus: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});

export const { setLogout, setLogin, loginStatus } = loggedStore.actions;
