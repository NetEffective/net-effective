import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import * as billsActions from 'redux/modules/bills';
import * as usStateActions from 'redux/modules/usState';
import * as repsActions from 'redux/modules/reps';
import * as locationActions from 'redux/modules/location';
import { push } from 'react-router-redux';
import {Bill, Rep} from 'components';
import {Link} from 'react-router';

@connect(
  state => ({
    bills: state.bills.list,
    usState: state.usState.current,
    name: state.auth.user ? state.auth.user.name : null,
    reps: state.reps.list,
    location: state.location.coords,
    userCity: state.auth.user ? state.auth.user.city : '',
    userUsState: state.auth.user ? state.auth.user.stateName : '',
    friends: state.auth.user ? state.auth.user.friends : [],
    user: state.auth.user,
  }),
  {
    ...billsActions,
    ...usStateActions,
    ...repsActions,
    ...locationActions,
    pushState: push,
  }
)

export default class StateDetail extends Component {
  static propTypes = {
    params: PropTypes.object,
    bills: PropTypes.array,
    location: PropTypes.object,
    loadBills: PropTypes.func,
    setUsState: PropTypes.func,
    usState: PropTypes.object,
    address: PropTypes.string,
    name: PropTypes.string,
    reps: PropTypes.array,
    loadReps: PropTypes.func,
    pushState: PropTypes.func,
    userCity: PropTypes.string,
    userUsState: PropTypes.string,
    friends: PropTypes.array,
    setLocation: PropTypes.func,
    user: PropTypes.object,
  }

  constructor(props) {
    super(props);

    this.askForLocation = this.askForLocation.bind(this);
    this.gotLocation = this.gotLocation.bind(this);
  }

  componentWillMount() {
    const { stateCode } = this.props.params;
    const { location } = this.props;
    this.props.setUsState(stateCode);
    this.props.loadBills(stateCode);
    if (! location) {
      this.askForLocation();
    } else {
      debugger;
      this.props.loadReps(location.latitude, location.longitude);
    }
    // this.props.loadReps(location.latitude, location.longitude);
  }

  componentWillReceiveProps(nextProps) {
    debugger;
    if (! this.props.location && nextProps.location) {
      this.props.loadReps(location.latitude, location.longitude);
    }
  }

  askForLocation() {
    window.navigator.geolocation.getCurrentPosition(this.gotLocation, (err) => {
      debugger;
      console.log('geolocation error', err);
      alert('Need your location!');
    });
  }

  gotLocation(location) {
    console.log(location.coords);
    this.props.setLocation(location.coords);
    this.props.pushState(`/state/${this.props.user.stateCode.toLowerCase()}`);
  }

  render() {
    const { address, usState } = this.props;
    const styles = require('./StateDetail.scss');
    debugger;
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
              <Bill
                {...bill}
                key={bill.billTitle}
                userName={this.props.name}
                reps={this.props.reps}
                city={this.props.userCity}
                usState={this.props.userUsState}
              />
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


            <div>
              Friends
              {_.map(this.props.friends, friend => (
                <Link to="/state/ar">
                  {friend.name}
                </Link>
              ))}
            </div>
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
