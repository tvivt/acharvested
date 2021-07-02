import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '.'

interface TokenListStore{
  name: string;
  timestamp: string;
  version: any;
  keywords: any[];
  tokens: any[];
  logoURI: string;
  support: any[];
}

const initialState: TokenListStore = {
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
export const getTokens = (state: RootState) => state.tokenlist.tokens;
export const getSupport = (state: RootState) => state.tokenlist.support;

export default tokenlistSlice;