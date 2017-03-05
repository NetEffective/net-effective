import React, {PropTypes} from 'react';
import {CallScript} from '..';

const Bill = (props) => {
  return (
    <div className="bill panel panel-default">
      <h2>{props.billTitle}</h2>
      <div>
        <a href={props.newsURL} target="_blank">View article</a>
      </div>
      <p>{props.billSummary}</p>
      <p>Moderation status: {props.moderationStatus}</p>
      <CallScript {...props} />
    </div>
  );
};

Bill.propTypes = {
  moderationStatus: PropTypes.string,
  state: PropTypes.string,
  topic: PropTypes.string,
  submissionDate: PropTypes.string, // TODO: turn into date obj
  nextVotingDate: PropTypes.string,
  newsURL: PropTypes.string,
  billID: PropTypes.string,
  billURL: PropTypes.string,
  billTitle: PropTypes.string,
  billSummary: PropTypes.string,
  opposedBecause: PropTypes.string,
};

export default Bill;
