import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { authReducer } from './auth';
import { coffeesReducer } from './coffees';

export default combineReducers({
  auth: authReducer,
  coffees: coffeesReducer,
  // keeps the router in sync with the state
  routing: routerReducer
});
