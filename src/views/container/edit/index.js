import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';

import { coffeesActions } from 'store/coffees';
import BoundComponent from 'views/components/base/bound-component';

class EditContainer extends BoundComponent {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date().toISOString().substr(0, 10),
      time: new Date().toTimeString().substr(0, 8)
    };
  }

  onClick() {
    const ts = new Date(`${this.state.date} ${this.state.time}`);
    if (!isNaN(ts.getTime())) {
      this.props.addSpecific(ts);
      this.setState({
        date: '',
        time: ''
      });
    } else {
      console.log('Not a valid timestamp.', ts, this.state.date, this.state.time);
      toastr.error('Error', `Not a valid date: ${ts}`);
    }
  }

  render() {
    return (
      <div>
        <h4>Add specific entry</h4>
        <input
          type="date"
          onChange={e => this.setState({ date: e.target.value })}
          value={this.state.date}
        />
        <input
          type="time"
          onChange={e => this.setState({ time: e.target.value })}
          value={this.state.time}
        />
        <button onClick={this.onClick}>Add</button>
      </div>
    );
  }
}

EditContainer.propTypes = {
  addSpecific: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  addSpecific: coffeesActions.addSpecific
};

export default connect(null, mapDispatchToProps)(EditContainer);
