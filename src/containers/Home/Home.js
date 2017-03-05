import React, { Component, PropTypes } from 'react';
import config from '../../config';
import Helmet from 'react-helmet';
// import {AddressSelection} from 'components';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import * as authActions from 'redux/modules/auth';
import {Login} from '..';

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
    user: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.setUser = this.setUser.bind(this);
  }

  setUser(user) {
    this.props.setUserInfo(user);
    debugger;
    this.props.pushState(`/state/${user.stateCode.toLowerCase()}`);
  }

  render() {
    const styles = require('./Home.scss');
    // require the logo image both from client and server
    const logoImage = require('./logo.png');

    return (
      <div className={styles.home}>
        <Helmet title="Home"/>
        {! this.props.user &&
        <Login callback={this.setUser} />
        }
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

        {/* <div className={styles.address}> */}
          {/* <h3>Please enter your address so we can show you a script for your representatives.</h3> */}
          {/* <AddressSelection onSubmit={(name, address) => this.setUser(name, address)} /> */}
        {/* </div> */}
      </div>
    );
  }
}
