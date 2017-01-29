import {isAuthenticated} from 'store/auth';
import App from './app';
import LoginContainer from './container/login';

export const paths = {
  ROOT: '/',
  LOGIN: '/login',
  DASHBOARD: '/'
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
    childRoutes: [{
      indexRoute: {
        getComponent(location, cb) {
          System.import('./container/dashboard')
            .then(module => cb(null, module.default));
        },
        onEnter: requireAuth(getState)
      }
    }, {
      path: paths.LOGIN,
      component: LoginContainer,
      onEnter: requireUnauth(getState)
    }]
  };
};
