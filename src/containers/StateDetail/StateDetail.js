import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import * as billsActions from 'redux/modules/bills';
import * as usStateActions from 'redux/modules/usState';
import * as repsActions from 'redux/modules/reps';
import { push } from 'react-router-redux';
import {Bill, Rep} from 'components';

@connect(
  state => ({
    bills: state.bills.list,
    usState: state.usState.current,
    address: state.auth.user ? state.auth.user.address : null,
    name: state.auth.user ? state.auth.user.name : null,
    reps: state.reps.list,
  }),
  {
    ...billsActions,
    ...usStateActions,
    ...repsActions,
    pushState: push,
  }
)

export default class StateDetail extends Component {
  static propTypes = {
    params: PropTypes.object,
    bills: PropTypes.array,
    loadBills: PropTypes.func,
    setUsState: PropTypes.func,
    usState: PropTypes.object,
    address: PropTypes.string,
    name: PropTypes.string,
    reps: PropTypes.array,
    loadReps: PropTypes.func,
    pushState: PropTypes.func,
  }

  componentWillMount() {
    const { address, stateCode } = this.props.params;
    this.props.setUsState(stateCode);
    this.props.loadBills(stateCode);
    this.props.loadReps(address);
  }

  render() {
    const { address, usState } = this.props;
    const styles = require('./StateDetail.scss');
    return (
      <div>
        <div className="row">
          <div className={styles.stateTitle + ' col-xs-12'}>
            <div className="page-header">
              <h1>{usState.name} <small>{address}</small></h1>
            </div>
            {this.props.bills &&
            <p>Looks like there are a few bills in your state that affect abortion access. Take a look and make some calls to your representatives!</p>
            }
          </div>
        </div>
        <div className="row">
          {this.props.bills &&
          <div className="col-md-8">
            <h2>Bills up for debate</h2>
            {_.map(this.props.bills, bill => (
              <Bill {...bill} key={bill.billTitle} userName={this.props.name} reps={this.props.reps} address={this.props.address}/>
            ))}
            <p className={styles.caughtup}>✌️ You're all caught up! No more bills.</p>
          </div>
          }

          {! this.props.bills &&
          <p>Unable to load the bills pertinent to you. Please try again.</p>
          }

          {this.props.reps &&
          <div className="col-md-4">
            <h2>Your Representatives</h2>
            {_.map(this.props.reps, (rep, i) => (
              <Rep key={`rep-${i}`} {...rep} />
            ))}
          </div>
          }

          {! this.props.reps &&
          <h2>Unable to load your local reps for {usState.code} =(</h2>
          }
        </div>
      </div>
    );
  }
}
