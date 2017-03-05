import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import * as billsActions from 'redux/modules/bills';
import * as usStateActions from 'redux/modules/usState';
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
  }

  componentWillMount() {
    const { stateCode } = this.props.params;
    this.props.setUsState(stateCode);
    this.props.loadBills(stateCode);
  }

  render() {
    // const styles = require('./StateDetail.scss');
    return (
      <div className="container">
        <div>
          <p>
            state name: {this.props.usStateCode}
          </p>

          {this.props.bills &&
          <div>
            <h2>Bills:</h2>
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
            <h2><strong>{this.props.usStateCode}</strong> Reps</h2>
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
          <h2>Unable to load your local reps =(</h2>
          }

        </div>
      </div>
    );
  }
}
