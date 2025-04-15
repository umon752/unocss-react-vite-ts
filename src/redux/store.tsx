import { configureStore } from '@reduxjs/toolkit'
import toastReducer from './slice/toastSlice'
import modalReducer from './slice/modalSlice'

export const store = configureStore({
  reducer: { 
    toast: toastReducer,
    modal: modalReducer,
  }
})