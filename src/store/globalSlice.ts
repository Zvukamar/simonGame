import { createSlice } from '@reduxjs/toolkit';
import { helpers } from '../utils';
import { GlobalInitialStateType } from './types';

const initialState: GlobalInitialStateType = {
  isStarted: false,
  modalVisible: false,
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
    gameOver(state, { payload }) {
      const prevScoresTable = state.scores;
      prevScoresTable.push({
        gameId: helpers.uuid(),
        name: payload.name,
        score: payload.score,
      });
      prevScoresTable.sort((a, b) => b.score - a.score);
      state.isStarted = false;
      state.modalVisible = true;
      state.scores = prevScoresTable;
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
