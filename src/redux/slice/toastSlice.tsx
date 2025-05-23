import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ToastProps = {
  text: string;
  active: boolean;
  icon: string;
};

const initialState: ToastProps = {
  text: '',
  active: false,
  icon: '',
};

export const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    showToast: (_, action: PayloadAction<Omit<ToastProps, 'active'>>) => ({
      ...action.payload,
      active: true,
    }),
    hideToast: (state) => ({
      ...state,
      active: false,
    }),
  },
});

export default toastSlice.reducer;
export const { showToast, hideToast } = toastSlice.actions;
