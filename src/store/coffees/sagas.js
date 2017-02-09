import { call, fork, put, takeEvery, take, cancel } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';

import { firebaseDb } from 'store/firebase';
import { coffeesActions } from './actions';
import { authActions } from 'store/auth/actions';

let path = null;

const addTimestamp = timestamp => {
  if (path == null) throw Error('path cant be null');
  return new Promise((res, rej) => {
    firebaseDb
      .ref(path)
      .push({ timestamp: timestamp.getTime() })
      .then(() => res())
      .catch(err => rej(err));
  });
};

const removeEntry = id => {
  if (id == null) throw new Error('id cant be null');
  return new Promise((res, rej) => {
    firebaseDb
      .ref(`${path}/${id}`)
      .remove()
      .then(() => res())
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

function* remove(action) {
  const { id } = action.payload;
  try {
    yield call(removeEntry, id);
    yield put(coffeesActions.removeSucceeded());
  } catch (error) {
    yield put(coffeesActions.removeFailed(error));
  }
}

function* update() {
  // eslint-disable-line
  // TODO We have to come up with an orderBy strategy for firebase
  const ref = firebaseDb.ref(path);

  // We have to create a channel as we can't yield from within the
  // callback scope. The eventChannel bridges the callback
  // and the generator scope.
  const channel = yield eventChannel(emit => {
    ref.on('value', data => {
      emit(coffeesActions.updateList(data.val()));
    });

    return () => ref.off();
  });

  // eslint-disable-next-line
  while (true) {
    // This will yield on each ref-value event
    let action = yield take(channel);
    yield put(action);
  }
}

function* watchLoginSucceeded() {
  // TODO why does takeEvery not work here?
  // eslint-disable-next-line
  while (true) {
    const { payload } = yield take(authActions.LOGIN_SUCCEEDED);
    path = `coffees/${payload.authUser.uid}`;

    // As soon as we are logged in, we create a job to listen
    // for update events
    const job = yield fork(update);
    yield take(authActions.LOGOUT_SUCCEEDED);
    // and if we receive a logout, we stop the update job.
    yield cancel(job);
  }
}

function* watchRemove() {
  yield takeEvery(coffeesActions.REMOVE, remove);
}

function* watchAdd() {
  yield takeEvery(coffeesActions.ADD, add);
}

export const coffeesSagas = [
  fork(watchAdd),
  fork(watchRemove),
  fork(watchLoginSucceeded)
];
