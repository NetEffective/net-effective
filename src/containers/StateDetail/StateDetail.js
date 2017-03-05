import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import * as billsActions from 'redux/modules/bills';
import * as usStateActions from 'redux/modules/usState';
import {Bill} from '../../components';

@connect(
  state => ({
    user: state.auth.user,
    bills: state.bills.list,
    usStateCode: state.usState.currentUsState,
  }),
  {
    ...billsActions,
    ...usStateActions,
  }
)

export default class StateDetail extends Component {
  static propTypes = {
    params: PropTypes.object,
    user: PropTypes.object,
    bills: PropTypes.array,
    loadBills: PropTypes.func,
    setUsState: PropTypes.func,
    usStateCode: PropTypes.string,
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
                  <Bill {...bill} userName="Jojo" />
                </li>
              ))}
            </ul>
          </div>
          }

        </div>
      </div>
    );
  }
}
