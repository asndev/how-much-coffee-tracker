import {Record, List} from 'immutable';
import {coffeesActions} from './actions';

export const CoffeesState = new Record({
  coffees: new List()
});

export function coffeesReducer(state = new CoffeesState(), {payload, type}) {
  switch (type) {
    case coffeesActions.ADD_SUCCEEDED:
    console.log('Payload: ', payload);
      return state.merge({
        coffees: state.coffees.push(payload.entry)
      });

    default:
      return state;
  }
}
