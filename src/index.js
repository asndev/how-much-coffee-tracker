import React from 'react';
// import ReactDOM from 'react-dom';
import { render } from 'preact';
// import { AppContainer } from 'react-hot-loader';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import { firebaseAuth } from 'store/firebase';
import { authActions } from './store/auth/actions';
import { configureStore } from './store/store';
import Root from './views/root';

import './views/styles/globals.scss';

const store = configureStore();
const rootElement = document.getElementById('root');

let root;

function init(Root) {
  root = render(
    <Root
      history={syncHistoryWithStore(browserHistory, store)}
      store={store}
    />,
    rootElement,
    root
  );
}

if (module.hot) {
  module.hot.accept('./views/root', () => {
    requestAnimationFrame(init(require('./views/root').default));
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
  .then(_ => init(Root))
  .catch(e => console.error(e));
