import React, {Component} from 'react';

export default class Footer extends Component {
  render() {
    const styles = require('./Footer.scss');
    return (
      <p className={styles.github}>
        <a href="https://github.com/NetEffective/net-effective"
           target="_blank">
          <i className="fa fa-github"/> View project on Github
        </a>
      </p>
    );
  }
}
