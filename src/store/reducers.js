import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import {authReducer} from './auth';

export default combineReducers({
  auth: authReducer,
  // keeps the router in sync with the state
  routing: routerReducer
});
