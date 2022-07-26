import { createSlice } from '@reduxjs/toolkit';
import { GlobalInitialStateType } from './types';

const initialState: GlobalInitialStateType = {
  isStarted: false,
  currentScore: 0,
  scores: [],
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    startGame(state) {
      state.isStarted = true;
    },
    addCurrentScore(state) {
      state.currentScore++;
    },
  },
});

export const { addCurrentScore, startGame } = globalSlice.actions;
export default globalSlice.reducer;
