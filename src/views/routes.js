import { isAuthenticated } from 'store/auth';
import App from './app';

export const paths = {
  ROOT: '/',
  LOGIN: '/login',
  DASHBOARD: '/',
  EDIT: '/edit'
};

const requireAuth = getState => {
  return (nextState, replace) => {
    if (!isAuthenticated(getState())) {
      replace(paths.LOGIN);
    }
  };
};

const requireUnauth = getState => {
  return (nextState, replace) => {
    if (isAuthenticated(getState())) {
      replace(paths.DASHBOARD);
    }
  };
};

export const getRoutes = getState => {
  return {
    path: paths.ROOT,
    component: App,
    childRoutes: [
      {
        indexRoute: {
          getComponent(location, cb) {
            System.import('./container/dashboard').then(module =>
              cb(null, module.default));
          },
          onEnter: requireAuth(getState)
        }
      },
      {
        path: paths.EDIT,
        getComponent(location, cb) {
          System.import('./container/edit').then(module =>
            cb(null, module.default));
        },
        onEnter: requireAuth(getState)
      },
      {
        path: paths.LOGIN,
        getComponent(location, cb) {
          System.import('./container/login').then(module =>
            cb(null, module.default));
        },
        onEnter: requireUnauth(getState)
      }
    ]
  };
};
