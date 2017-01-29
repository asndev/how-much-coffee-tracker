import React from 'react'; // eslint-disable-line no-unused-vars
import {authReducer, AuthState} from './reducer';
import {authActions} from './actions';

describe('store', () => {
  describe('AuthReducer', () => {
    it('should have the correct inital state', () => {
      const state = authReducer(undefined, {type: 'foobar'});
      expect(state.authenticated).toBe(false);
      expect(state.uid).toBe(null);
      expect(state.user).toBe(null);
    });

    it('should correctly handle successful login', () => {
      const state = authReducer(undefined, {
        payload: {
          uid: '1234567',
          name: 'Batman'
        },
        type: authActions.LOGIN_SUCCEEDED
      });

      expect(state.authenticated).toBe(true);
      expect(state.uid).toBe('1234567');
      expect(state.user.get('name')).toBe('Batman');
    });

    it('should correctly handle logout', () => {
      const loggedIn = new AuthState().merge({
        authenticated: true,
        uid: '1234',
        user: {}
      });

      const state = authReducer(loggedIn, {type: authActions.LOGOUT_SUCCEEDED});

      expect(state.authenticated).toBe(false);
      expect(state.uid).toBe(null);
      expect(state.user).toBe(null);
    });
  });
});
