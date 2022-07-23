import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface CounterState {
  assetId: string;
}

const initialState: CounterState = {
  assetId: '',
};

export const assetSlice = createSlice({
  name: 'asset',
  initialState,
  reducers: {
    setAsset: (state, action: PayloadAction<string>) => {
      state.assetId = action.payload;
    },
  },
});

export const { setAsset } = assetSlice.actions;
