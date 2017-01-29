import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {authActions} from 'store/auth';

const LoginContainer = ({loginWithGoogle}) => {
  return (
    <div>
      <a onClick={loginWithGoogle}>Google Login</a>
    </div>
  );
};

LoginContainer.propTypes = {
  loginWithGoogle: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  loginWithGoogle: authActions.loginWithGoogle
};

export default connect(null, mapDispatchToProps)(LoginContainer);
