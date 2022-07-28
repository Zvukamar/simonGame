import { store } from '../store';

export type RootState = ReturnType<typeof store.getState>;

export interface GlobalInitialStateType {
  isStarted: boolean;
  currentScore: number;
  scores: ResultType[];
  modalVisible: boolean;
}

interface ResultType {
  gameId: string;
  name: string;
  score: number;
}
