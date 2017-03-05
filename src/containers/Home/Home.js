import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
// import {AddressSelection} from 'components';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import * as authActions from 'redux/modules/auth';
import * as locationActions from 'redux/modules/location';
import {Login} from '..';

@connect(
  state => ({
    user: state.auth.user
  }),
  {
    pushState: push,
    ...authActions,
    ...locationActions,
  }
)
export default class Home extends Component {
  static propTypes = {
    setUserInfo: PropTypes.func,
    loadReps: PropTypes.func,
    pushState: PropTypes.func,
    setLocation: PropTypes.func,
    user: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.handleFacebookLogin = this.handleFacebookLogin.bind(this);
    this.askForLocation = this.askForLocation.bind(this);
    this.gotLocation = this.gotLocation.bind(this);
  }

  handleFacebookLogin(user) {
    this.props.setUserInfo(user);
    this.askForLocation();
  }

  askForLocation() {
    // if ("geolocation" in window.navigator) {
    //   // geolocation is available
    // } else {
    //   // geolocation IS NOT available
    // }

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
    const styles = require('./Home.scss');
    // require the logo image both from client and server
    const logoImage = require('./ne-heart.svg');

    return (
      <div className={styles.home}>
        <Helmet title="Home"/>
        <div className={styles.masthead}>
          <div className="container">
            <div className={styles.intro + ' row'}>
              <div className="col-md-7">
                <h1>Advocate for women's health.</h1>
                <h1>Leverage the power of your network.</h1>
                <h1>Make change.</h1>
              </div>
              <div className={styles.logo + ' col-md-5'}>
                <img src={logoImage}/>
              </div>
            </div>
            <div className="row">
              <h3 className={styles.h3 + ' col-md-10'}>Your network is powerful. Connect with your friends in states with laws that restrict abortion and harm female healthcare access. Give them a simple script to call their state representatives and advocate for women.</h3>
            </div>
            {! this.props.user &&
            <Login callback={this.handleFacebookLogin} />
            }
          </div>
        </div>
      </div>
    );
  }
}
