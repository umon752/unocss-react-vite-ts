import { configureStore } from '@reduxjs/toolkit';
import toastReducer from './slice/toastSlice';
import modalReducer from './slice/modalSlice';

export type RootState = {
  toast: ReturnType<typeof toastReducer>;
  modal: ReturnType<typeof modalReducer>;
};

export const store = configureStore({
  reducer: {
    toast: toastReducer,
    modal: modalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: true,
      immutableCheck: true,
    }),
});

// dispatch type
export type AppDispatch = typeof store.dispatch;
