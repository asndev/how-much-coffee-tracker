import {call, fork, put, takeEvery} from 'redux-saga/effects';

import {coffeesActions} from './actions';

const addTS = (timestamp) => {
  return timestamp;
};

function* add(action) {
  const payload = action.payload;
  console.log(payload);
  try {
    // do request: yield call ...
    const result = yield call(addTS, payload.timestamp);
    console.log(result);
    yield put(coffeesActions.addSucceeded(result));
  } catch (error) {
    yield put(coffeesActions.addFailed(error));
  }
}

function* watchAdd() {
  // Take every LoginRequest action
  yield takeEvery(coffeesActions.ADD, add);
}

export const coffeesSagas = [
  fork(watchAdd)
];
