import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import * as billsActions from 'redux/modules/bills';

@connect(
  state => ({
    user: state.auth.user,
    bills: state.bills,
  }),
  billsActions
)

export default class StateDetail extends Component {
  static propTypes = {
    params: PropTypes.object,
    user: PropTypes.object,
    bills: PropTypes.array,
    loadBills: PropTypes.func,
  }

  componentWillMount() {
    debugger;
    this.props.loadBills(this.props.params.stateCode);
  }

  render() {
    // const styles = require('./StateDetail.scss');
    debugger;
    return (
      <div className="container">
        <div>
          <p>
            state name: {this.props.params.stateCode}
          </p>
          <ul>
            {_.map(this.props.bills, bill => (
              <li key={bill.billTitle}>{bill.billTitle}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
