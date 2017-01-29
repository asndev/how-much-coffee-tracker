import {createSelector} from 'reselect';

export function isAuthenticated(state) {
  return state.auth.authenticated;
}

// Memoized selector assures that getAuth will only recalculate iff
// something from state.auth changes.
export const getAuth = createSelector(
  state => state.auth,
  auth => auth.toJS()
);
