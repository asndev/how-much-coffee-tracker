import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {coffeesActions, getCoffees} from 'store/coffees';

class DashboardContainer extends React.Component {

  handleClick() {
    this.props.add();
  }

  handleRemove(id) {
    this.props.remove(id);
  }

  renderList() {
    if (!this.props.coffees) {
      // TODO write regression test for this
      return 'no data yet';
    }
    const data = this.props.coffees;
    return Object
      .keys(data)
      .map((day) => {
        const count = Object.keys(data[day]).length;
        return <li key={day}>
          <h4>{day} ({count})</h4>
          <ul>
            {data[day].map(e => {
              return this.createLi(e.key, e.value);
            })}
          </ul>
        </li>;
      });
  }

  createLi(key, value) {
    return <li key={key}>
      {new Date(value).toLocaleTimeString()}
      <a onClick={() => this.handleRemove(key)}>x</a>
    </li>;
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
    remove: PropTypes.func.isRequired,
    coffees: PropTypes.object
};

const mapDispatchToProps = {
  add: coffeesActions.add,
  remove: coffeesActions.remove
};

export default connect(
  getCoffees,
  mapDispatchToProps
)(DashboardContainer);
