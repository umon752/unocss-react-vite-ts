import { createSlice } from '@reduxjs/toolkit'

type ModalProps = {
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
    showModal(_: ModalProps, action: { payload: Omit<ModalProps, 'active'> }) {
      return {
        ...action.payload,
        active: true,
      }
    },
    hideModal(state: ModalProps) {
      return {
        ...state,
        active: false,
      }
    },
  } 
})

export default modalSlice.reducer
export const { showModal, hideModal } = modalSlice.actions
