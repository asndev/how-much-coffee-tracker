import { authSagas } from './auth';
import { coffeesSagas } from './coffees';

// Register all sagas which will be 'run' within the saga middleware
export default function* sagas() {
  yield [...authSagas, ...coffeesSagas];
}
