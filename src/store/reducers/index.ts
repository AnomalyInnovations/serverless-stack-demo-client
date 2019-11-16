import { combineReducers } from 'redux';

import { noteReducer } from './note';

export const rootReducer = combineReducers({
  note: noteReducer
});

export type AppState = ReturnType<typeof rootReducer>;
