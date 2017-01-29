import React from 'react';
import {connect} from 'react-redux';

const DashboardContainer = () => {
  return (
    <div>
      <h4>Dashboard</h4>
    </div>
  );
};

DashboardContainer.propTypes = {};

export default connect()(DashboardContainer);
