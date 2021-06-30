import { createSlice } from '@reduxjs/toolkit';
import { ConnectWalletStatus } from '../shared/status';

export const zh_CN = 'zh_CN';
export const en_US = 'en_US';

// connectWalletStatus 三个状态
// 0 未连接
// 1 已初始化 provider
// 2 已验证钱包


const usedType = !!window.imToken ? 'imtoken' : 'metamask';

const initialState = {
  address: '',
  usedType,
  nonce: '',
  sign: '',
  language: en_US,
  connectWalletStatus: ConnectWalletStatus.no
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
    },
    setSign(state, action){
      state.sign = action.payload;
    },
    setConnectWalletStatus(state, action){
      state.connectWalletStatus = action.payload;
    }
  }
});

export const { setAddress, setNonce, setSign, setConnectWalletStatus } = userSlice.actions;
export const getAddress = (state) => state.user.address;
export const getNonce = (state) => state.user.nonce;
export const getUsedType = (state) => state.user.usedType;
export const getLanguage = (state) => state.user.language;
export const getSign = (state) => state.user.sign;
export const getConnectWalletStatus = (state) => state.user.connectWalletStatus;

export default userSlice;