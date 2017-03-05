import React, {PropTypes} from 'react';

const CallScript = ({userName, city, state, repName, billTitle, opposedBecause}) => {
  return (
    <section className="call-script well">
      <p>Hi, my name is {userName} and I live in {city}, {state}.</p>
      <p>I don't need a response.</p>
      <p>I'm calling to urge {repName} to oppose {billTitle} because {opposedBecause}.</p>
      <p>Thank you for your time.</p>
    </section>
  );
};

CallScript.propTypes = {
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

export default CallScript;
