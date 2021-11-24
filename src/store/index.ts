import { configureStore } from '@reduxjs/toolkit';

import link from './modules/link';
import main from './modules/main';
import profile from './modules/profile';

const store = configureStore({
  reducer: {
    ...main,
    ...profile,
    ...link
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
