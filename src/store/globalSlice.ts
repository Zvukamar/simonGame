import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    testFunc(state, { payload }) {},
  },
});

export const { testFunc } = globalSlice.actions;
export default globalSlice.reducer;
