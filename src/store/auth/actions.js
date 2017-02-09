import firebase from 'firebase';

export const authActions = {
  LOGIN_REQUESTED: 'LOGIN_REQUESTED',
  LOGIN_FAILED: 'LOGIN_FAILED',
  LOGIN_SUCCEEDED: 'LOGIN_SUCCEEDED',
  LOGOUT: 'LOGOUT',
  LOGOUT_FAILED: 'LOGOUT_FAILED',
  LOGOUT_SUCCEEDED: 'LOGOUT_SUCCEEDED',
  login: authProvider => ({
    type: authActions.LOGIN_REQUESTED,
    payload: { authProvider }
  }),
  loginSucceeded: authUser => ({
    type: authActions.LOGIN_SUCCEEDED,
    payload: { authUser }
  }),
  loginFailed: error => ({
    type: authActions.LOGIN_FAILED,
    payload: { error }
  }),
  logout: () => ({ type: authActions.LOGOUT }),
  logoutSucceeded: () => ({ type: authActions.LOGOUT_SUCCEEDED }),
  logoutFailed: error => ({
    type: authActions.LOGOUT_FAILED,
    payload: { error }
  }),
  // TODO just add all providers + activate @ firebase
  loginWithGoogle: () =>
    authActions.login(new firebase.auth.GoogleAuthProvider())
};
