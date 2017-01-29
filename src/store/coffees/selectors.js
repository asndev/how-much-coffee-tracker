import {createSelector} from 'reselect';

// Memoized selector assures that getAuth will only recalculate iff
// something from state.auth changes.
export const getCoffees = createSelector(
  state => state.coffees,
  coffees => coffees.toJS()
);
