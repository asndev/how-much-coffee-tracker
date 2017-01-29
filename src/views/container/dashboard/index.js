import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {coffeesActions, getCoffees} from 'store/coffees';

class DashboardContainer extends React.Component {

  handleClick() {
    this.props.add();
  }

  renderList() {
    return this.props.coffees.map(e => {
      const key = e.toTimeString();
      // TODO add key from firebase
      return <li>{key}</li>;
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
    coffees: PropTypes.array
};

const mapDispatchToProps = {
  add: coffeesActions.add
};

export default connect(
  getCoffees,
  mapDispatchToProps
)(DashboardContainer);
