import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {coffeesActions, getCoffees} from 'store/coffees';

class DashboardContainer extends React.Component {

  handleClick() {
    this.props.add();
  }

  renderList() {
    return Object
      .entries(this.props.coffees)
      .map(([k, v]) => {
        const value = new Date(v.timestamp).toTimeString();
        return <li key={k}>{value}</li>;
      });
  }

  render() {
    return (
      <div>
        <h4>Dashboard</h4>
        <a onClick={this.handleClick.bind(this)}>Click</a>
        <ul>
        {this.renderList()}
        </ul>
      </div>
    );
  }
}

DashboardContainer.propTypes = {
    add: PropTypes.func.isRequired,
    coffees: PropTypes.object
};

const mapDispatchToProps = {
  add: coffeesActions.add
};

export default connect(
  getCoffees,
  mapDispatchToProps
)(DashboardContainer);
