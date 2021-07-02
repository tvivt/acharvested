import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '.';
import { ArchivedEntity } from '../shared/apis';

interface ArchivedStore {
  data: ArchivedEntity[];
}

const initialState: ArchivedStore = {
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
export const getArchived = (state: RootState) => state.archived.data;

export default archivedSlice;