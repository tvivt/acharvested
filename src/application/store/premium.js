import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  learns: [],
  potentials: [],
  yuque: [],
  code: 99
}

const premiumSlice = createSlice({
  name: 'premium',
  initialState,
  reducers: {
    setPremiumDataSource(state, action){
      state.learns = action.payload.learns;
      state.potentials = action.payload.potentials;
      state.yuque = action.payload.yuque;
      state.code = action.payload.code
    }
  }
});

export const { setPremiumDataSource } = premiumSlice.actions;
export const getLearns = (state) => state.premium.learns;
export const getPotentials = (state) => state.premium.potentials;
export const getYuque = (state) => state.premium.yuque; 
export const getCode = (state) => state.premium.code;

export default premiumSlice;
