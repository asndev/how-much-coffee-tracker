import React, {PropTypes} from 'react';

const createLi = (key, value, handleRemove) => {
  // TODO evaluate performance of '() => handle()' VS 'handle.bind(null, key)'.
  return <li key={key}>
    {new Date(value).toLocaleTimeString()}
    <a onClick={() => handleRemove(key)}> x</a>
  </li>;
};

const Day = ({day, timestamps, remove}) => {
  const count = timestamps.length;

  return <li>
    <h4>{day} ({count})</h4>
    <ul>
      {timestamps.reverse().map(e => {
        return createLi(e.key, e.value, remove);
      })}
    </ul>
  </li>;
};

Day.propTypes = {
  day: PropTypes.string.isRequired,
  timestamps: PropTypes.array.isRequired,
  remove: PropTypes.func.isRequired
};

export default Day;
