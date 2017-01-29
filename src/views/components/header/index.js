import React, {PropTypes} from 'react';

import './header.scss';

const Header = ({authenticated, logout}) => {
  return (
    <header className="header">
      <h1 className="header__title">Application</h1>
      <ul className="header__status">
        {authenticated ?
          <li><a onClick={logout}>Sign out</a></li> :
          <li>not-signed-in</li>}
      </ul>
    </header>
  );
};

Header.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired
};

export default Header;
