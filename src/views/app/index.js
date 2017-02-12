import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { authActions, getAuth } from 'store/auth';
import Header from 'views/components/header';

import './app.scss';

const App = ({ user, children, logout }) => {
  return (
    <div>
      <Header user={user} logout={logout} />
      <nav>
        <ul>
          <Link to="/"><li>Dashboard</li></Link>
          <Link to="/edit"><li>Add specific</li></Link>
        </ul>
      </nav>
      <main className="main">{children}</main>
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
