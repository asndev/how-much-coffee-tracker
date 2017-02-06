import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import {authActions, getAuth} from 'store/auth';
import Header from 'views/components/header';

import './app.scss';

const App = ({user, children, logout}) => {
  return (
    <div>
      <div>
        <Header
          user={user}
          logout={logout}
        />
        <main className="main">{children}</main>
      </div>
      <footer>(c) 2017 Anton Stepan - https://github.com/asndev/how-much-coffee-tracker</footer>
    </div>
  );
};

App.propTypes = {
  user: PropTypes.object,
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
