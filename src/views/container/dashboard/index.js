import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {coffeesActions, getCoffees} from 'store/coffees';

import BoundComponent from 'views/components/base/bound-component';
import Day from 'views/components/timestamps/day';

class DashboardContainer extends BoundComponent {

  onClick() {
    this.props.add();
  }

  onRemove(id) {
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
      .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
      .map((day) => {
        return <Day
          key={day}
          day={day}
          timestamps={data[day]}
          remove={this.onRemove}
        />;
      });
  }

  render() {
    return (
      <div>
        <h4>Dashboard</h4>
        <a onClick={this.onClick}>I just had a coffee!</a>
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
