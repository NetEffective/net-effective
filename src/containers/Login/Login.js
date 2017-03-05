import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import FacebookLogin from 'react-facebook-login';

import * as authActions from 'redux/modules/auth';

// const config = require('../../config');

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
    debugger;
  }

  facebookLoginCallback(response) {
    debugger;
    this.props.setUserInfo(response.name, null, response.picture.data.url);
  }

  render() {
    const {user, logout} = this.props;
    const styles = require('./Login.scss');
    // const { facebookAppId } = config.apiKeys;
    // debugger;
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
                fields="name,email,picture"
                onClick={this.handleFacebookButtonClick}
                scope="public_profile,user_friends,user_location,user_hometown"
                callback={this.facebookLoginCallback}
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
