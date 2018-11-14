import React, { Component } from 'react';
import Preloader from './Preloader';
import list from './abbreviations';
class Data extends Component {
  render() {
    const { data, preloader } = this.props;

    if (preloader.show === true) {
      return <Preloader />;
    }
    const name = data.name,
      temp = data.main.temp,
      weather = data.weather[0].description,
      country = data.sys.country;
    return (
      <div className="row">
        <div className="data_container container">
          <h3>
            Current Weather in {name},{list[country]}.
          </h3>
          <div className="details">
            {weather} with temperature of {parseFloat(temp).toFixed(2)}
            C.
          </div>
        </div>
      </div>
    );
  }
}

export default Data;
