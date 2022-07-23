import { combineReducers } from '@reduxjs/toolkit';

import { assetSlice } from '@/stores/asset-store';
import { deviceSlice } from '@/stores/device-store';
import { roomSlice } from '@/stores/room-store';
import { sideMenuSlice } from '@/stores/side-menu-store';

import { api } from '../../service/api/core/api';
import { authStore } from '../../stores/auth-store';
import { counterSlice } from '../../stores/counter-store';
import { loggedStore } from '../../stores/logged-store';

const rootReducer = combineReducers({
  [counterSlice.name]: counterSlice.reducer,
  [loggedStore.name]: loggedStore.reducer,
  [authStore.name]: authStore.reducer,
  [api.reducerPath]: api.reducer,
  [assetSlice.name]: assetSlice.reducer,
  [roomSlice.name]: roomSlice.reducer,
  [deviceSlice.name]: deviceSlice.reducer,
  [sideMenuSlice.name]: sideMenuSlice.reducer,
});

export default rootReducer;
