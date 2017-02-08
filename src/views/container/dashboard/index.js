import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {coffeesActions, getCoffees} from 'store/coffees';
import {List} from 'material-ui/List';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import LocalCafe from 'material-ui/svg-icons/maps/local-cafe';

import Day from 'views/components/timestamps/day';

class DashboardContainer extends React.Component {

  handleClick = () => this.props.add();

  handleRemove = id => () => this.props.remove(id);

  renderList() {
    if (!this.props.coffees) {
      // TODO write regression test for this
      return 'no data yet';
    }
    const data = this.props.coffees;
    return <List>
      {Object
      .keys(data)
      .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
      .map((day) => {
      return <Day
      key={day}
      day={day}
      timestamps={data[day]}
      remove={this.handleRemove.bind(this)}
      />;
    })}
    </List>
  }

  render() {
    return (
      <div>
        <FloatingActionButton
          backgroundColor="#27c9b9"
          style={{position: 'fixed', bottom: 30, right: 30}}
          onClick={this.handleClick}
        >
          <LocalCafe />
        </FloatingActionButton>
        {this.renderList()}
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
