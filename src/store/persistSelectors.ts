import { RootState } from './types';

export const getHighScoresSelector = (state: RootState) =>
  state.persist.highScoresDB;
