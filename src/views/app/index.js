import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import {authActions, getAuth} from 'store/auth';
import Header from 'views/components/header';

const App = ({authenticated, children, logout}) => {
  return (
    <div>
      <Header
        authenticated={authenticated}
        logout={logout}
      />
      <main>{children}</main>
    </div>
  );
};

App.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  children: PropTypes.element,
  logout: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  logout: authActions.logout
};

export default connect(
  getAuth, // auth-selector-state to props
  mapDispatchToProps
)(App);
