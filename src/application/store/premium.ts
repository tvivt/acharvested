import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.'
import { LearnEntity, PotentialEntity } from '../shared/apis';
import { ResponseCode } from '../shared/status';


interface PremiumStore {
  learns: LearnEntity[];
  potentials: PotentialEntity[];
  yuque: any[];
  code: ResponseCode
}

const initialState: PremiumStore = {
  learns: [],
  potentials: [],
  yuque: [],
  code: 99
}

const premiumSlice = createSlice({
  name: 'premium',
  initialState,
  reducers: {
    setPremiumDataSource(state, action: PayloadAction<PremiumStore>){
      state.learns = action.payload.learns;
      const pre = action.payload.potentials.filter((v) => v.mark === 1);
      const last = action.payload.potentials.filter((v) => v.mark === 0);
      state.potentials = [...pre, ...last];
      state.yuque = action.payload.yuque;
      state.code = action.payload.code
    }
  }
});

export const { setPremiumDataSource } = premiumSlice.actions;
export const getLearns = (state: RootState) => state.premium.learns;
export const getPotentials = (state: RootState) => state.premium.potentials;
export const getYuque = (state: RootState) => state.premium.yuque; 
export const getCode = (state: RootState) => state.premium.code;

export default premiumSlice;
