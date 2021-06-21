import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  learn: [],
  potential: [],
  yuque: [],
  code: 99
}

const premiumSlice = createSlice({
  name: 'premium',
  initialState,
  reducers: {
    setPremiumDataSource(state, action){
      console.log('action', action)
      state.learn = action.payload.learn;
      state.potential = action.payload.potential;
      state.yuque = action.payload.yuque;
      state.code = action.payload.code
    }
  }
});

export const { setPremiumDataSource } = premiumSlice.actions;
export const getLearn = (state) => state.premium.learn;
export const getPotential = (state) => state.premium.potential;
export const getYuque = (state) => state.premium.yuque; 
export const getCode = (state) => state.premium.code;

export default premiumSlice;
