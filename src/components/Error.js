import React, { Component } from 'react';
import Preloader from './Preloader';

export default class Error extends Component {
  render() {
    const { preloader } = this.props;

    if (preloader.initialShow) {
      return null;
    } else if (preloader.show === true) {
      return <Preloader />;
    } else {
      return <div className="center red-text">Location not found... </div>;
    }
  }
}
