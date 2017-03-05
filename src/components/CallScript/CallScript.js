import React, {PropTypes} from 'react';

const CallScript = (props) => {
  return (
    <section className="call-script well">
      <p>Hi, my name is {props.userName} and I live at {props.address}.</p>
      <p>I don't need a response.</p>
      <p>I'm calling to urge {props.repName} to oppose {props.billTitle} because {props.opposedBecause}.</p>
      <p>Thank you for your time.</p>
    </section>
  );
};

CallScript.propTypes = {
  moderationStatus: PropTypes.string,
  address: PropTypes.string,
  topic: PropTypes.string,
  submissionDate: PropTypes.string, // TODO: turn into date obj
  nextVotingDate: PropTypes.string,
  newsURL: PropTypes.string,
  billID: PropTypes.string,
  billURL: PropTypes.string,
  billTitle: PropTypes.string,
  billSummary: PropTypes.string,
  opposedBecause: PropTypes.string,
  userName: PropTypes.string,
  repName: PropTypes.string,
};

export default CallScript;
