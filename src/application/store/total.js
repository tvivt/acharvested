import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  learnTotal: 0,
  potentialTotal: 0,
  accountTotal: 0,
  priceTotal: 0
}

const totalSlice = createSlice({
  name: 'total',
  initialState,
  reducers: {
    setAllTotal(state, action){
      state.learnTotal = action.payload.learnTotal;
      state.potentialTotal = action.payload.potentialTotal;
      state.accountTotal = action.payload.accountTotal;
      state.priceTotal = action.payload.priceTotal;
    }
  }
});

export const { setAllTotal } = totalSlice.actions;
export const getLearnTotal = (state) => state.total.learnTotal;
export const getPotentialTotal = (state) => state.total.potentialTotal; 
export const getAccountTotal = (state) => state.total.accountTotal; 
export const getPriceTotal = (state) => state.total.priceTotal; 

export default totalSlice;