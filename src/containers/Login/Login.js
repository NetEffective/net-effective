import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as authActions from 'redux/modules/auth';

@connect(
  state => ({user: state.auth.user}),
  authActions
)
export default class Login extends Component {
  static propTypes = {
    user: PropTypes.object,
    login: PropTypes.func,
    logout: PropTypes.func
  }

  // handleSubmit = (event) => {
  //   event.preventDefault();
  //   this.props.login(this.refs.email.value, this.refs.password.value);
  //   this.refs.email.value = '';
  //   this.refs.password.value = '';
  // }

  render() {
    const {user, logout} = this.props;
    const styles = require('./Login.scss');
    return (
      <div className={styles.login + ' container'}>
        {!user &&
        <div>

          <div className="row">
            <div className="col-sm-6 col-sm-offset-3">
              <button className={styles.btnFbConnect + ' btn btn-block btn-lg'}>
                <i className="fa fa-facebook-square fa-lg" style={{marginRight: 10}} />
                Connect with Facebook
              </button>
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
