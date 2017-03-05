import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import FacebookLogin from 'react-facebook-login';
import _ from 'lodash';

import * as authActions from 'redux/modules/auth';

// const config = require('../../config');


// TODO: make utility function or put in db:
const usStates = [
  { name: 'ALABAMA', abbreviation: 'AL'},
  { name: 'ALASKA', abbreviation: 'AK'},
  { name: 'AMERICAN SAMOA', abbreviation: 'AS'},
  { name: 'ARIZONA', abbreviation: 'AZ'},
  { name: 'ARKANSAS', abbreviation: 'AR'},
  { name: 'CALIFORNIA', abbreviation: 'CA'},
  { name: 'COLORADO', abbreviation: 'CO'},
  { name: 'CONNECTICUT', abbreviation: 'CT'},
  { name: 'DELAWARE', abbreviation: 'DE'},
  { name: 'DISTRICT OF COLUMBIA', abbreviation: 'DC'},
  { name: 'FEDERATED STATES OF MICRONESIA', abbreviation: 'FM'},
  { name: 'FLORIDA', abbreviation: 'FL'},
  { name: 'GEORGIA', abbreviation: 'GA'},
  { name: 'GUAM', abbreviation: 'GU'},
  { name: 'HAWAII', abbreviation: 'HI'},
  { name: 'IDAHO', abbreviation: 'ID'},
  { name: 'ILLINOIS', abbreviation: 'IL'},
  { name: 'INDIANA', abbreviation: 'IN'},
  { name: 'IOWA', abbreviation: 'IA'},
  { name: 'KANSAS', abbreviation: 'KS'},
  { name: 'KENTUCKY', abbreviation: 'KY'},
  { name: 'LOUISIANA', abbreviation: 'LA'},
  { name: 'MAINE', abbreviation: 'ME'},
  { name: 'MARSHALL ISLANDS', abbreviation: 'MH'},
  { name: 'MARYLAND', abbreviation: 'MD'},
  { name: 'MASSACHUSETTS', abbreviation: 'MA'},
  { name: 'MICHIGAN', abbreviation: 'MI'},
  { name: 'MINNESOTA', abbreviation: 'MN'},
  { name: 'MISSISSIPPI', abbreviation: 'MS'},
  { name: 'MISSOURI', abbreviation: 'MO'},
  { name: 'MONTANA', abbreviation: 'MT'},
  { name: 'NEBRASKA', abbreviation: 'NE'},
  { name: 'NEVADA', abbreviation: 'NV'},
  { name: 'NEW HAMPSHIRE', abbreviation: 'NH'},
  { name: 'NEW JERSEY', abbreviation: 'NJ'},
  { name: 'NEW MEXICO', abbreviation: 'NM'},
  { name: 'NEW YORK', abbreviation: 'NY'},
  { name: 'NORTH CAROLINA', abbreviation: 'NC'},
  { name: 'NORTH DAKOTA', abbreviation: 'ND'},
  { name: 'NORTHERN MARIANA ISLANDS', abbreviation: 'MP'},
  { name: 'OHIO', abbreviation: 'OH'},
  { name: 'OKLAHOMA', abbreviation: 'OK'},
  { name: 'OREGON', abbreviation: 'OR'},
  { name: 'PALAU', abbreviation: 'PW'},
  { name: 'PENNSYLVANIA', abbreviation: 'PA'},
  { name: 'PUERTO RICO', abbreviation: 'PR'},
  { name: 'RHODE ISLAND', abbreviation: 'RI'},
  { name: 'SOUTH CAROLINA', abbreviation: 'SC'},
  { name: 'SOUTH DAKOTA', abbreviation: 'SD'},
  { name: 'TENNESSEE', abbreviation: 'TN'},
  { name: 'TEXAS', abbreviation: 'TX'},
  { name: 'UTAH', abbreviation: 'UT'},
  { name: 'VERMONT', abbreviation: 'VT'},
  { name: 'VIRGIN ISLANDS', abbreviation: 'VI'},
  { name: 'VIRGINIA', abbreviation: 'VA'},
  { name: 'WASHINGTON', abbreviation: 'WA'},
  { name: 'WEST VIRGINIA', abbreviation: 'WV'},
  { name: 'WISCONSIN', abbreviation: 'WI'},
  { name: 'WYOMING', abbreviation: 'WY' }
];

const stateNamesToCodes = {};
_.each(usStates, usState => {
  stateNamesToCodes[usState.name] = usState.abbreviation;
});

@connect(
  state => ({user: state.auth.user}),
  authActions
)
export default class Login extends Component {
  static propTypes = {
    user: PropTypes.object,
    login: PropTypes.func,
    logout: PropTypes.func,
    setUserInfo: PropTypes.func,
    callback: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.handleFacebookButtonClick = this.handleFacebookButtonClick.bind(this);
    this.facebookLoginCallback = this.facebookLoginCallback.bind(this);
  }

  // handleSubmit = (event) => {
  //   event.preventDefault();
  //   this.props.login(this.refs.email.value, this.refs.password.value);
  //   this.refs.email.value = '';
  //   this.refs.password.value = '';
  // }

  handleFacebookButtonClick() {
    // do nothing for now
  }

  facebookLoginCallback(response) {
    const { name, picture, location, friends } = response;

    debugger;
    const locationInfo = location.name.split(',');
    const city = locationInfo[0];
    const stateName = locationInfo[1].substring(1);

    this.props.callback({
      name,
      city,
      stateName,
      stateCode: stateNamesToCodes[stateName.toUpperCase()],
      friendsCount: friends.summary.total_count,
      imageUrl: picture.data.url,
    });
  }

  render() {
    const {user, logout} = this.props;
    const styles = require('./Login.scss');
    // const { facebookAppId } = config.apiKeys;
    return (
      <div className={styles.login + ' container'}>
        {!user &&
        <div>

          <div className="row">
            <div className="col-sm-6 col-sm-offset-3">
              {false &&
              <button className={styles.btnFbConnect + ' btn btn-block btn-lg'}>
                <i className="fa fa-facebook-square fa-lg" style={{marginRight: 10}} />
                Connect with Facebook
              </button>
              }

              <FacebookLogin
                appId="1297839500295733"
                autoLoad
                fields="name,email,picture,friends,locale,location,hometown"
                onClick={this.handleFacebookButtonClick}
                scope="public_profile,user_friends,user_location,user_hometown"
                callback={this.facebookLoginCallback}
                cssClass={styles.btnFbConnect + ' btn btn-block btn-lg'}
                icon="fa-facebook"
              />
            </div>
          </div>
        </div>
        }
        {user &&
        <div>
          <p>You are currently logged in as {user.email}.</p>

          <div>
            <button className="btn btn-danger" onClick={logout}><i className="fa fa-sign-out"/>{' '}Log Out</button>
          </div>
        </div>
        }
      </div>
    );
  }
}
