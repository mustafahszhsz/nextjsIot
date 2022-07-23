import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface SideMenuState {
  sideMenuStatus: 'expand' | 'shrink';
  sideMenuContent: 'asset' | 'room' | 'device' | 'map' | 'editProfile';
  navMenuContent: 'Home' | 'Map' | 'Analysis' | 'Settings' | 'nothing';
}

const initialState: SideMenuState = {
  sideMenuStatus: 'shrink',
  sideMenuContent: 'asset',
  navMenuContent: 'nothing',
};

export const sideMenuSlice = createSlice({
  name: 'sideMenu',
  initialState,
  reducers: {
    setSideMenuStatus: (state, action: PayloadAction<'expand' | 'shrink'>) => {
      state.sideMenuStatus = action.payload;
    },
    setSideMenuContent: (
      state,
      action: PayloadAction<'asset' | 'room' | 'device' | 'map' | 'editProfile'>
    ) => {
      state.sideMenuContent = action.payload;
    },
    setNavMenuContent: (
      state,
      action: PayloadAction<
        'Home' | 'Map' | 'Analysis' | 'Settings' | 'nothing'
      >
    ) => {
      state.navMenuContent = action.payload;
    },
  },
});

export const { setSideMenuStatus, setSideMenuContent, setNavMenuContent } =
  sideMenuSlice.actions;
