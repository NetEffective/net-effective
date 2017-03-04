import React, { Component, PropTypes } from 'react';

export default class StateDetail extends Component {
  static propTypes = {
    params: PropTypes.object,
    // stateName: PropTypes.string,
  }

  render() {
    // const styles = require('./StateDetail.scss');
    return (
      <div className="container">
        <div>
          <p>
            state name: {this.props.params.stateName}
          </p>
        </div>
      </div>
    );
  }
}
