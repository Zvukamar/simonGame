import { RootState } from './types';

export const isGameStartedSelector = (state: RootState) =>
  state.global.isStarted;

export const getCurrentScoreSelector = (state: RootState) =>
  state.global.currentScore;

export const getScoreTableSelector = (state: RootState) => state.global.scores;
