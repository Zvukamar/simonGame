import { RootState } from './types';

export const isGameStartedSelector = (state: RootState) => state.global.isStarted;
