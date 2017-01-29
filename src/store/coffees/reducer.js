import {Record, List} from 'immutable';

export const CoffeesState = new Record({
  coffees: new List()
});

export function coffeesReducer(state = new CoffeesState(), {payload, type}) {
  switch (type) {
    default:
      return state;
  }
}
