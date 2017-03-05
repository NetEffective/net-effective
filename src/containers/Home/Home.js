import React, { Component, PropTypes } from 'react';
import config from '../../config';
import Helmet from 'react-helmet';
import {AddressSelection} from 'components';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import * as authActions from 'redux/modules/auth';

@connect(
  state => ({
    user: state.auth.user
  }),
  {
    pushState: push,
    ...authActions,
  }
)
export default class Home extends Component {
  static propTypes = {
    setUserInfo: PropTypes.func,
    loadReps: PropTypes.func,
    pushState: PropTypes.func,
  }

  setUserInfo(name, address) {
    const usState = 'ar';
    this.props.setUserInfo(name, address);
    this.props.pushState(`/state/${usState}`);
  }

  render() {
    const styles = require('./Home.scss');
    // require the logo image both from client and server
    const logoImage = require('./logo.png');

    return (
      <div className={styles.home}>
        <Helmet title="Home"/>
        <div className={styles.masthead}>
          <div className="container">
            <div className={styles.logo}>
              <p>
                <img src={logoImage}/>
              </p>
            </div>

            <h2>{config.app.description}</h2>
            <p>
              <a className={styles.github} href="https://github.com/NetEffective/net-effective"
                 target="_blank">
                <i className="fa fa-github"/> View on Github
              </a>
            </p>
          </div>
        </div>

        <div className={styles.address}>
          <h3>Please enter your address so we can show you a script for your representatives.</h3>
          <AddressSelection onSubmit={(name, address) => this.setUserInfo(name, address)} />
        </div>
      </div>
    );
  }
}
