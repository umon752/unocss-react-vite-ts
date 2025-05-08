import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type ModalProps = {
  type: string;
  title: string;
  text: string;
  btn: {
    text: string;
    url?: string; 
  }
  active: boolean;
}

const initialState: ModalProps = {
  type: '',
  title: '',
  text: '',
  btn: {
    text: '',
    url: '',
  },
  active: false,
}

export const modalSlice = createSlice({ 
  name: 'modal', 
  initialState, 
  reducers: { 
    showModal: (_, action: PayloadAction<Omit<ModalProps, 'active'>>) => ({
      ...action.payload,
      active: true,
    }),
    hideModal: (state) => ({
      ...state,
      active: false,
    }),
  } 
})

export default modalSlice.reducer
export const { showModal, hideModal } = modalSlice.actions
