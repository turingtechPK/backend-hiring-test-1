import { configureStore } from '@reduxjs/toolkit';

import { apiVfinal } from './reducers/apiFinal';

export const store = configureStore({
  reducer: {
    [apiVfinal.reducerPath]: apiVfinal.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiVfinal.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
