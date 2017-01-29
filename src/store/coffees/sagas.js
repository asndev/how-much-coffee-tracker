import {call, fork, put, takeEvery, take, cancel} from 'redux-saga/effects';
import {eventChannel} from 'redux-saga';

import {firebaseDb} from 'store/firebase';
import {coffeesActions} from './actions';
import {authActions} from 'store/auth/actions';

let path = null;

const addTimestamp = (timestamp) => {
  if (path == null) throw Error('path cant be null');

  return new Promise((res, rej) => {
    firebaseDb.ref(path)
      .push({timestamp: timestamp.getTime()})
      .then(_ => res())
      .catch(err => rej(err));
  });
};

function* add(action) {
  const payload = action.payload;
  try {
    yield call(addTimestamp, payload.timestamp);
    console.log('pushed successfully');
    yield put(coffeesActions.addSucceeded());
  } catch (error) {
    yield put(coffeesActions.addFailed(error));
  }
}

function* update() { // eslint-disable-line
  const ref = firebaseDb.ref(path).orderByChild('timestamp');

  const channel = yield eventChannel(emit => {
    ref.on('value', (data) => {
      emit(coffeesActions.updateList(data.val()));
    });

    return () => ref.off();
  });

  while(true) { // eslint-disable-line
    let action = yield take(channel);
    yield put(action);
  }
}

function* watchLoginSucceeded() {
  // TODO why does takeEvery not work here?
  while (true) { // eslint-disable-line
    const {payload} = yield take(authActions.LOGIN_SUCCEEDED);
    path = `coffees/${payload.authUser.uid}`;

    const job = yield fork(update);
    yield take(authActions.LOGOUT_SUCCEEDED);
    yield cancel(job);
  }
}

function* watchAdd() {
  yield takeEvery(coffeesActions.ADD, add);
}

export const coffeesSagas = [
  fork(watchAdd),
  fork(watchLoginSucceeded)
];
