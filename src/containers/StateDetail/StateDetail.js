import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import * as billsActions from 'redux/modules/bills';
import * as usStateActions from 'redux/modules/usState';
import * as repsActions from 'redux/modules/reps';
import { push } from 'react-router-redux';
import {Bill, Rep} from '../../components';

@connect(
  state => ({
    // user: state.auth.user,
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
    // user: PropTypes.object,
    bills: PropTypes.array,
    loadBills: PropTypes.func,
    setUsState: PropTypes.func,
    usState: PropTypes.object,
    address: PropTypes.string,
    userName: PropTypes.string,
    reps: PropTypes.array,
    loadReps: PropTypes.func,
    pushState: PropTypes.func,
  }

  componentWillMount() {
    // const { address } = this.props;
    const address = '1077 texas st, san francisco, ca 94107';
    const { stateCode } = this.props.params;
    if (! stateCode || ! address) {
      this.props.pushState('/');
    }
    this.props.setUsState(stateCode);
    this.props.loadBills(stateCode);
    this.props.loadReps(address);
  }

  render() {
    const { usState } = this.props;
    // const styles = require('./StateDetail.scss');
    return (
      <div className="container">
        <div>
          <h1>{usState.name}</h1>
          {this.props.bills &&
          <div>
            <h2><strong>{usState.code}</strong> Bills</h2>
            <ul>
              {_.map(this.props.bills, bill => (
                <li key={bill.billTitle}>
                  <Bill {...bill} userName={this.props.userName} />
                </li>
              ))}
            </ul>
          </div>
          }

          {! this.props.bills &&
          <h2>Unable to load the pertinent bills =(</h2>
          }

          {this.props.reps &&
          <div>
            <h2><strong>{usState.code}</strong> Reps</h2>
            <ul>
              {_.map(this.props.reps, (rep, i) => (
                <Rep key={`rep-${i}`} {...rep} />
              ))}
            </ul>
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
