import React, {PropTypes} from 'react';
import _ from 'lodash';

const Rep = ({office, name, party, phones, urls, photoUrl, emails, channels}) => {
  return (
    <div className="bill panel panel-default">
      <div className="panel-heading">
        <h2 className="panel-title">{name}</h2>
      </div>
      <div className="row">
        <div className="col-sm-6">

          <p>Site: <a href={urls[0]} target="_blank"></a></p>
          <p>office: {office}</p>
          <p>party: {party}</p>
          <p>Phone: {phones[0]}</p>
          <p>Email: {emails[0]}</p>

          <ul className="socials list-unstyled">
            {_.map(channels, ({type, id}) => (
              <p key={id}>{type}: {id}</p>
            ))}
          </ul>
        </div>
        <div className="col-sm-6 col-md-3">
          <img src={photoUrl} className="img-fluid" alt={name} />
        </div>
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
