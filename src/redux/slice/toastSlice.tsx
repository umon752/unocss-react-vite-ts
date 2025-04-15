import { createSlice } from '@reduxjs/toolkit'

type ToastProps = {
  text: string;
  active: boolean;
  icon: string;
}

const initialState: ToastProps = {
  text: '',
  active: false,
  icon: '',
}

export const toastSlice = createSlice({ 
  name: 'toast', 
  initialState, 
  reducers: { 
    showToast(_: ToastProps, action: { payload: Omit<ToastProps, 'active'> }) {
      return {
        ...action.payload,
        active: true,
      }
    },
    hideToast(state: ToastProps) {
      return {
        ...state,
        active: false,
      }
    },
  } 
})

export default toastSlice.reducer
export const { showToast, hideToast } = toastSlice.actions
