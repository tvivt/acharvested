import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  timestamp: '',
  version: {},
  keywords: [],
  tokens: [],
  logoURI: '',
  support: []
}

const tokenlistSlice = createSlice({
  name: 'tokenlist',
  initialState,
  reducers: {
    setTokenlist(state, action){
      const { payload } = action;
      state.name = payload.name;
      state.timestamp = payload.timestamp;
      state.version = payload.version;
      state.keywords = payload.keywords;
      state.tokens = payload.tokens;
      state.logoURI = payload.logoURI;
      state.support = payload.support;
    }
  }
});

export const { setTokenlist } = tokenlistSlice.actions;
export const getTokens = (state) => state.tokenlist.tokens;
export const getSupport = (state) => state.tokenlist.support;

export default tokenlistSlice;