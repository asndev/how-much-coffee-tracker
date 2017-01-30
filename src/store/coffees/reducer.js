import {Record} from 'immutable';

import {coffeesActions} from './actions';

export const CoffeesState = new Record({
  coffees: {} // TODO use record
});

const transform = (data) => {
  let result = {};

  Object.keys(data).forEach(key => {
    const value = data[key].timestamp;
    const ds = new Date(value).toDateString();
    const entity = {key, value};
    result[ds] = result[ds] ? result[ds].concat(entity) : result[ds] = [entity];
  });

  return result;
};

export function coffeesReducer(state = new CoffeesState(), {payload, type}) {
  switch (type) {
    case coffeesActions.UPDATE_LIST:
      return state.merge({
        coffees: transform(payload)
      });
    default:
      return state;
  }
}
