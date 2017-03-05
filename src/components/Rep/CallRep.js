import React, {PropTypes} from 'react';

const CallRep = (props) => {
  const styles = require('./CallRep.scss');
  const largeClass = props.large ? 'btn-lg' : '';
  return (
    <div>
      {props.phones && props.phones[0] &&
      <button className={styles.btn + ' ' + largeClass + ' btn btn-primary'}>Call {props.name} at {props.phones[0]}</button>
      }
    </div>
  );
};

CallRep.propTypes = {
  name: PropTypes.string,
  phones: PropTypes.array,
  large: PropTypes.bool,
};

export default CallRep;
