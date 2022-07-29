import { createSlice } from '@reduxjs/toolkit';
import { GlobalInitialStateType } from './types';

const initialState: GlobalInitialStateType = {
  isStarted: false,
  modalVisible: false,
  currentScore: 0,
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
    gameOver(state) {
      state.isStarted = false;
      state.modalVisible = true;
    },
    resetGame(state) {
      state.isStarted = false;
      state.currentScore = 0;
    },
  },
});

export const { resetGame, gameOver, addCurrentScore, startGame } =
  globalSlice.actions;
export default globalSlice.reducer;
