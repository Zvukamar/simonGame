import { createSlice } from '@reduxjs/toolkit';
import { helpers } from '../utils';
import { PersistInitialStateType } from './types';

const initialState: PersistInitialStateType = {
  highScoresDB: [],
};

const persistSlice = createSlice({
  name: 'persist',
  initialState,
  reducers: {
    addNewRecord(state, { payload }) {
      const prevScoresTable = [...state.highScoresDB];
      const gameInfo = {
        gameId: helpers.uuid(),
        playerName: payload.name,
        playerScore: payload.score,
      };
      prevScoresTable.push(gameInfo);
      prevScoresTable.sort((a, b) => b.playerScore - a.playerScore);
      state.highScoresDB = prevScoresTable;
    },
  },
});

export const { addNewRecord } = persistSlice.actions;
export default persistSlice.reducer;
