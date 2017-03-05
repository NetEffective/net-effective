import React, {PropTypes} from 'react';
import { CallScript, CallRep } from 'components';
import _ from 'lodash';

const Bill = (props) => {
  const billImage = require('./bill.svg');
  const styles = require('./Bill.scss');
  return (
    <div className={styles.bill}>
      <div className="row">
        <div className="col-xs-2">
          <img className={styles.icon} src={billImage} />
        </div>
        <div className="content col-xs-10">
          {props.billTitle &&
          <h3 className={styles.title}>{props.billTitle}</h3>
          }
          {props.billSummary &&
          <h4 className="subtitle">{props.billID}: {props.billSummary}</h4>
          }
          {props.newsURL &&
          <a href={props.newsURL} className={styles.url} target="_blank">News Article &rarr;</a>
          }
          {props.billURL &&
          <a href={props.billURL} className="url" target="_blank">Bill Details &rarr;</a>
          }
          <hr/>
          <h4>Ready to call? Here's a script for you.</h4>
          <CallScript {...props} />
          {_.map(props.reps, rep => (
              <CallRep {...rep} large key={rep.name} />
          ))}
        </div>
      </div>
    </div>
  );
};

Bill.propTypes = {
  moderationStatus: PropTypes.string,
  state: PropTypes.string,
  city: PropTypes.string,
  usState: PropTypes.string,
  topic: PropTypes.string,
  submissionDate: PropTypes.string, // TODO: turn into date obj
  nextVotingDate: PropTypes.string,
  newsURL: PropTypes.string,
  billID: PropTypes.string,
  billURL: PropTypes.string,
  billTitle: PropTypes.string,
  billSummary: PropTypes.string,
  opposedBecause: PropTypes.string,
  reps: PropTypes.array,
  userName: PropTypes.string,
};

export default Bill;
