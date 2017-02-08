import React, {PropTypes} from 'react';
import {ListItem} from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import {FormattedDate} from 'react-intl';

const menuButton = (
  <IconButton touch={true}>
    <MoreVertIcon/>
  </IconButton>
);

const Day = ({day, timestamps, remove}) => {
  const count = timestamps.length;

  return <ListItem
    primaryText={`${day} (${count})`}
    primaryTogglesNestedList={true}
    nestedItems={
      timestamps.reverse().map(e =>
        <ListItem
          key={e.key}
          primaryText={
            <FormattedDate
              value={new Date(e.value)}
              hour="numeric"
              minute="numeric"
            />
          }
          rightIconButton={
            <IconMenu iconButtonElement={menuButton}>
              <MenuItem onTouchTap={remove(e.key)}>Delete</MenuItem>
            </IconMenu>
          }
        />
      )}
  >
  </ListItem>;
};

Day.propTypes = {
  day: PropTypes.string.isRequired,
  timestamps: PropTypes.array.isRequired,
  remove: PropTypes.func.isRequired
};

export default Day;
