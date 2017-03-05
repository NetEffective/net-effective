import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as authActions from 'redux/modules/auth';

@connect(
  state => ({user: state.auth.user}),
  authActions
)
export default class LoginPage extends Component {
  static propTypes = {
    user: PropTypes.object,
    login: PropTypes.func,
    logout: PropTypes.func
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.login(this.refs.email.value, this.refs.password.value);
    this.refs.email.value = '';
    this.refs.password.value = '';
  }

  render() {
    const {user, logout} = this.props;
    const styles = require('./LoginPage.scss');
    return (
      <div className={styles.login + ' container'}>
        {!user &&
        <div>
          <form className="login-form form-inline" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input type="text" ref="email" placeholder="email" className="form-control"/><br/>
              <input type="password" ref="password" placeholder="password" className="form-control"/><br/>
            <button className="btn btn-success" onClick={this.handleSubmit}><i className="fa fa-sign-in"/>{' '}Log In
            </button>
            </div>
          </form>
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
