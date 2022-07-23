import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface CounterState {
  roomName: string;
}

const initialState: CounterState = {
  roomName: '',
};

export const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    setRoom: (state, action: PayloadAction<string>) => {
      state.roomName = action.payload;
    },
  },
});

export const { setRoom } = roomSlice.actions;
