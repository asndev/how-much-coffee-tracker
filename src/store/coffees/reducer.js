import {Record} from 'immutable';

import {coffeesActions} from './actions';

export const CoffeesState = new Record({
  coffees: {} // TODO use record
});

export function coffeesReducer(state = new CoffeesState(), {payload, type}) {
  switch (type) {
    case coffeesActions.UPDATE_LIST:
      return state.merge({
        coffees: payload
      });
    default:
      return state;
  }
}
