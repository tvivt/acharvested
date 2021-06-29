import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: []
}

const archivedSlice = createSlice({
  name: 'archived',
  initialState,
  reducers: {
    setArchived(state, action){
      state.data = action.payload;
    }
  }
});

export const { setArchived } = archivedSlice.actions;
export const getArchived = (state) => state.archived.data;

export default archivedSlice;