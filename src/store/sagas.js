import {authSagas} from './auth';

// Register all sagas which will be 'run' within the saga middleware
export default function* sagas() {
  yield [...authSagas];
}
