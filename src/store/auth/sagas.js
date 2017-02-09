import { call, fork, put, takeLatest } from 'redux-saga/effects';
import { push, replace } from 'react-router-redux';

import { firebaseAuth } from 'store/firebase';
import { authActions } from './actions';

function* login(action) {
  const { authProvider } = action.payload;

  try {
    const authData = yield call(
      [firebaseAuth, firebaseAuth.signInWithPopup],
      authProvider
    );
    yield put(authActions.loginSucceeded(authData.user));
    yield put(push('/'));
  } catch (error) {
    yield put(authActions.loginFailed(error));
  }
}

function* logout() {
  try {
    yield call([firebaseAuth, firebaseAuth.signOut]);
    yield put(authActions.logoutSucceeded());
    yield put(replace('/login'));
  } catch (error) {
    yield put(authActions.logoutFailed(error));
  }
}

function* watchLogin() {
  // Take every LoginRequest action
  yield takeLatest(authActions.LOGIN_REQUESTED, login);
}

function* watchLogout() {
  // Take every logout action
  yield takeLatest(authActions.LOGOUT, logout);
}

export const authSagas = [fork(watchLogin), fork(watchLogout)];
