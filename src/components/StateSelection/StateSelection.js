import React from 'react';
import Select from 'react-select';

const StateSelection = (props) => {
  function mapStateToOption(state) {
    return {'label': state, 'value': state};
  }
  const states = require('./states.json');
  const statesOptions = states.map(mapStateToOption);

  return (
    <Select
      name="states"
      value=""
      options={statesOptions}
      onChange={props.onChange}
    />
  );
};

StateSelection.propTypes = {
  onChange: React.PropTypes.any.isRequired
};

export default StateSelection;
