import { createSlice } from '@reduxjs/toolkit';

export const zh_CN = 'zh_CN';
export const en_US = 'en_US';

// metamask
// imtoken
// wallectconnect

const usedType = !!window.imToken ? 'imtoken' : 'metamask';

const initialState = {
  address: '',
  usedType,
  nonce: '',
  language: zh_CN
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAddress(state, action){
      state.address = action.payload;
    },
    setNonce(state, action){
      state.nonce = action.payload;
    },
    setUsedType(state, action){
      state.usedType = action.payload;
    },
    setLanguage(state, action){
      state.language = action.payload;
    }
  }
});

export const { setAddress, setNonce, setUsedType } = userSlice.actions;
export const getAddress = (state) => state.user.address;
export const getNonce = (state) => state.user.nonce;
export const getUsedType = (state) => state.user.usedType;
export const getLanguage = (state) => state.user.language;

export default userSlice;