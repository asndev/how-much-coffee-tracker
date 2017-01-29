import {Record} from 'immutable';
import {authActions} from './actions';

export const AuthState = new Record({
  authenticated: false,
  uid: null,
  user: null
});

export function authReducer(state = new AuthState(), {payload, type}) {
  switch (type) {
    case authActions.LOGIN_SUCCEEDED:
      return state.merge({
        authenticated: true,
        uid: payload.uid,
        user: payload
      });

    case authActions.LOGOUT_SUCCEEDED:
      return state.merge({
        authenticated: false,
        uid: null,
        user: null
      });

    default:
      return state;
  }
}
