import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import {browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';

import {firebaseAuth} from 'store/firebase';
import {authActions} from './store/auth/actions';
import {configureStore} from './store/store';
import Root from './views/root';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {IntlProvider, addLocaleData} from 'react-intl';
import de from 'react-intl/locale-data/de';
addLocaleData(de);
injectTapEventPlugin();

import './views/styles/globals.scss';

const store = configureStore();
const rootElement = document.getElementById('root');

function render(Root) {
  ReactDOM.render(
    (
      <IntlProvider locale="de">
        <MuiThemeProvider>
          <AppContainer>
            <Root
              history={syncHistoryWithStore(browserHistory, store)}
              store={store}
            />
          </AppContainer>
        </MuiThemeProvider>
      </IntlProvider>
    ),
    rootElement
  );
}

if (module.hot) {
  module.hot.accept('./views/root', () => {
    render(require('./views/root').default);
  });
}

// Before we render the app, we evaluate firebases `onAuthStateChanged` once
// to login the user if a session is present in the local storage.
// We have to do this before the react-router kicks in.
// https://firebase.google.com/docs/reference/js/firebase.auth.Auth#onAuthStateChanged
new Promise((resolve, reject) => {
  // the observer returns its unsubscribe function
  const unsub = firebaseAuth.onAuthStateChanged(
    user => {
      // If a user is present (fetched from the localStorage),
      // then we dispatch a login succeed.
      if (user) {
        store.dispatch(authActions.loginSucceeded(user));
      }
      // Then resolve the promise
      resolve();
      // And unsubscribe the observer, as we only want
      // to do this before the render.
      unsub();
    },
    error => reject(error)
  );
})
  .then(_ => render(Root))
  .catch(e => console.error(e));
