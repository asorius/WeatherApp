import React, { Component } from 'react'
import Preloader from './Preloader';


export default class Error extends Component {
    render() {
        const { preloader } = this.props;
    
        if (preloader.show === true) {
          return <Preloader />;
        }
       
        return (
            <div className="center">Location not found.. </div>
        );
      }
}

