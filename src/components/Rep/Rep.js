import React, {PropTypes} from 'react';
import { CallRep } from 'components';

const Rep = (props) => {
  const styles = require('./Rep.scss');
  return (
    <div className={styles.rep + ' row'}>
      <div className="col-md-4">
        <img src={props.photoUrl} className={styles.photo + ' img-rounded'} alt={props.name} />
      </div>
      <div className="content col-md-8">
        <h4>{props.name}</h4>
        <p>{props.office}</p>
        <p>{props.party}</p>
        <CallRep {...props} key={props.name}/>
        <a href={'mailto:' + props.emails[0]}>{props.emails[0]}</a>
      </div>
    </div>
  );
};

Rep.propTypes = {
  office: PropTypes.string,
  name: PropTypes.string,
  party: PropTypes.string,
  phones: PropTypes.array,
  urls: PropTypes.array,
  photoUrl: PropTypes.string,
  emails: PropTypes.array,
  channels: PropTypes.array,
};

export default Rep;
