import React, {PropTypes} from 'react';

import './header.scss';

const renderUserNav = (user, logout) => {
  return (
    <ul className="header__status">
      <li className="header__hello">Hello {user.authUser.displayName}</li>
      <li><a onClick={logout}>Sign out</a></li>
    </ul>
  );
};

const Header = ({user, logout}) => {
  return (
    <header className="header">
      <h1 className="header__title">How much Coffee?</h1>
      {user != null && renderUserNav(user, logout)}
    </header>
  );
};

Header.propTypes = {
  user: PropTypes.object,
  logout: PropTypes.func.isRequired
};

export default Header;
