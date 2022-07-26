import { store } from '../store';

export type RootState = ReturnType<typeof store.getState>;

export interface GlobalInitialStateType {
  isStarted: boolean;
  currentScore: number;
  scores: number[];
}
