import React from 'react'; // eslint-disable-line no-unused-vars
import {Map} from 'immutable';

import {coffeesReducer} from './reducer';
import {coffeesActions} from './actions';

describe('store', () => {
  describe('CoffeesReducer', () => {
    it('should update correctly for an empty list', () => {
      const payload = {};
      const state = coffeesReducer(undefined,
        {type: coffeesActions.UPDATE_LIST, payload});

      expect(state.coffees).toEqual(new Map({
      }));
    });

    it('should correctly transform multiple dates', () => {
      const payload = {
        '3': {timestamp: new Date('2017-01-13').getTime()},
        '4': {timestamp: new Date('2016-12-24').getTime()},
        '5': {timestamp: new Date('2017-02-01').getTime()},
        '6': {timestamp: new Date('2017-01-13 14:15').getTime()},
      };
      const state = coffeesReducer(undefined,
        {type: coffeesActions.UPDATE_LIST, payload});

      expect(state.coffees.toJS()).toEqual({
      'Sat Dec 24 2016': [{key: '4', value: payload[4].timestamp}],
      'Fri Jan 13 2017': [{key: '3', value: payload[3].timestamp},
        {key: '6', value: payload[6].timestamp}],
      'Wed Feb 01 2017': [{key: '5', value: payload[5].timestamp}]
      });
    });
  });
});
