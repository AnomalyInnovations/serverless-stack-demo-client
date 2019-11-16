import { createSlice } from '@reduxjs/toolkit';

const SLICE_NAME = 'note';

const INIT_NOTE_STATE = {};

const noteSlice = createSlice({
  name: SLICE_NAME,
  initialState: INIT_NOTE_STATE,
  reducers: {}
});

export const { reducer: noteReducer } = noteSlice;
