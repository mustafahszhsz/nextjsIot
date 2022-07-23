import { PersistConfig, persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';

import { assetSlice } from '@/stores/asset-store';
import { deviceSlice } from '@/stores/device-store';
import { roomSlice } from '@/stores/room-store';
import { sideMenuSlice } from '@/stores/side-menu-store';

import { authStore } from '../../stores/auth-store';
import { counterSlice } from '../../stores/counter-store';
import { loggedStore } from '../../stores/logged-store';
import rootReducer from './root-reducer';

export type RootState = ReturnType<typeof rootReducer>;

const persistConfig: PersistConfig<RootState> = {
  key: 'root',
  storage: storage,
  stateReconciler: autoMergeLevel2,
  whitelist: [
    counterSlice.name,
    authStore.name,
    assetSlice.name,
    roomSlice.name,
    deviceSlice.name,
    sideMenuSlice.name,
    loggedStore.name,
  ],
};

export const persistedReducer = persistReducer(persistConfig, rootReducer);
