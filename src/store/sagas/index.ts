import { all } from 'redux-saga/effects';

export function* rootSaga() {
  try {
    yield all([]);
  } catch (err) {
    console.log('@rootSaga:', err);
    throw err;
  }
}
