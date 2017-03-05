import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import * as billsActions from 'redux/modules/bills';
import * as usStateActions from 'redux/modules/usState';
import * as repsActions from 'redux/modules/reps';
import { push } from 'react-router-redux';
import {Bill} from '../../components';

@connect(
  state => ({
    // user: state.auth.user,
    bills: state.bills.list,
    usStateCode: state.usState.currentUsState,
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
    usStateCode: PropTypes.string,
    address: PropTypes.string,
    userName: PropTypes.string,
    reps: PropTypes.array,
    loadReps: PropTypes.func,
    pushState: PropTypes.func,
  }

  componentWillMount() {
    const { address } = this.props;
    const { stateCode } = this.props.params;
    debugger;
    if (! stateCode || ! address) {
      this.props.pushState('/');
    }
    this.props.setUsState(stateCode);
    this.props.loadBills(stateCode);
    this.props.loadReps(address);
  }

  render() {
    const {usStateCode: stateCode} = this.props;
    // const styles = require('./StateDetail.scss');
    return (
      <div className="container">
        <div>
          <p>
            state name: {this.props.usStateCode}
          </p>

          {this.props.bills &&
          <div>
            <h2><strong>{stateCode}</strong> Bills</h2>
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
            <h2><strong>{stateCode}</strong> Reps</h2>
            <ul>
              {_.map(this.props.reps, (rep, i) => (
                <div key={`rep-${i}`}>
                  Rep {i}
                </div>
              ))}
            </ul>
          </div>
          }

          {! this.props.reps &&
          <h2>Unable to load your local reps for {stateCode} =(</h2>
          }

        </div>
      </div>
    );
  }
}
