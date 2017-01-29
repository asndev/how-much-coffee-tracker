import {applyMiddleware, compose, createStore} from 'redux';
import {browserHistory} from 'react-router';
import {routerMiddleware} from 'react-router-redux';

import createSagaMiddleware from 'redux-saga';
import createLogger from 'redux-logger';
import reducers from './reducers';
import sagas from './sagas';


export function configureStore() {
  const sagaMiddleware = createSagaMiddleware();
  const routerReduxMiddleware = routerMiddleware(browserHistory);
  const logger = createLogger({collapsed: true});

  let middleware = applyMiddleware(
    sagaMiddleware,
    routerReduxMiddleware,
    logger
  );

  if (process.env.NODE_ENV !== 'production') {
    // If we are not in production mode
    const devToolsExtension = window.devToolsExtension;
    if (typeof devToolsExtension === 'function') {
      // and user has devtools extension installed, add it
      middleware = compose(middleware, devToolsExtension());
    }
  }

  const store = createStore(reducers, middleware);
  // start all registered sagas
  sagaMiddleware.run(sagas);

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(require('./reducers').default);
    });
  }

  return store;
}
