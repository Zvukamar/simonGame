import { store } from '../store';

export type RootState = ReturnType<typeof store.getState>;

export interface GlobalInitialStateType {
  isStarted: boolean;
  currentScore: number;
  modalVisible: boolean;
}

export interface PersistInitialStateType {
  highScoresDB: ResultType[];
}

interface ResultType {
  gameId: string;
  playerName: string;
  playerScore: number;
}
