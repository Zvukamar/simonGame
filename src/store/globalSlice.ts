import { createSlice } from '@reduxjs/toolkit';
import { GlobalInitialStateType } from './types';

const initialState: GlobalInitialStateType = {
  isStarted: false,
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    startGame(state) {
      state.isStarted = true;
    },
  },
});

export const { startGame } = globalSlice.actions;
export default globalSlice.reducer;
