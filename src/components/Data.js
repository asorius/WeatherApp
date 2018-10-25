import React, { Component } from 'react';
import Preloader from './Preloader';
class Data extends Component {
  render() {
    const { data, error, preloader } = this.props;

    if (error.error === true) {
      return null;
    }
    if (preloader.show === true) {
      return <Preloader />;
    }
    const name = data.name,
      temp = data.main.temp - 273.15,
      tempLow = parseFloat(data.main.temp_min - 273.15).toFixed(2),
      tempMax = parseFloat(data.main.temp_max - 273.15).toFixed(2),
      weather = data.weather[0].description,
      country = data.sys.country;
    return (
      <div className="data_container container">
        <h3>
          Current Weather in {name},{country}.
        </h3>
        <div className="details">
          {name} is expecting {weather}
          with temperature of {parseFloat(temp).toFixed(2)}C varying from{' '}
          {tempLow} to {tempMax}
        </div>
      </div>
    );
  }
}

export default Data;
