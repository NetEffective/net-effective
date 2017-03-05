import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import * as billsActions from 'redux/modules/bills';
import {Bill} from '../../components';

@connect(
  state => ({
    user: state.auth.user,
    bills: state.bills.list,
  }),
  billsActions,
)

export default class StateDetail extends Component {
  static propTypes = {
    params: PropTypes.object,
    user: PropTypes.object,
    bills: PropTypes.array,
    loadBills: PropTypes.func,
  }

  componentWillMount() {
    this.props.loadBills(this.props.params.stateCode);
  }

  render() {
    // const styles = require('./StateDetail.scss');
    return (
      <div className="container">
        <div>
          <p>
            state name: {this.props.params.stateCode}
          </p>

          {this.props.bills &&
          <div>
            <h2>Bills:</h2>
            <ul>
              {_.map(this.props.bills, bill => (
                <li key={bill.billTitle}>
                  <Bill {...bill} userName={this.props.user.name} />
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
