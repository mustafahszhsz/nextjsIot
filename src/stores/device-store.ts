import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface DeviceState {
  DeviceId: string;
  DeviceName: string;
  DeviceZone: string;
}

const initialState: DeviceState = {
  DeviceId: '',
  DeviceName: '',
  DeviceZone: '',
};

export const deviceSlice = createSlice({
  name: 'device',
  initialState,
  reducers: {
    setDeviceId: (state, action: PayloadAction<string>) => {
      state.DeviceId = action.payload;
    },
    setDeviceName: (state, action: PayloadAction<string>) => {
      state.DeviceName = action.payload;
    },
    setDeviceZone: (state, action: PayloadAction<string>) => {
      state.DeviceZone = action.payload;
    },
  },
});

export const { setDeviceId, setDeviceName, setDeviceZone } =
  deviceSlice.actions;
