import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '.';
import { TotalEntity } from '../shared/apis';


const initialState: TotalEntity = {
  learns: 0,
  potentials: 0,
  accounts: 0,
  price: 0
}

const totalSlice = createSlice({
  name: 'total',
  initialState,
  reducers: {
    setAllTotal(state, action){
      state.learns = action.payload.learns;
      state.potentials = action.payload.potentials;
      state.accounts = action.payload.accounts;
      state.price = action.payload.price;
    }
  }
});

export const { setAllTotal } = totalSlice.actions;
export const getLearnTotal = (state: RootState) => state.total.learns;
export const getPotentialTotal = (state: RootState) => state.total.potentials; 
export const getAccounts = (state: RootState) => state.total.accounts; 
export const getPrice = (state: RootState) => state.total.price; 

export default totalSlice;