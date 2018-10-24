import React, { Component } from 'react';

class Data extends Component {
  render() {
    const { data } = this.props;
    const name = data.name,
      temp = data.main.temp - 273.15,
      tempLow = parseFloat(data.main.temp_min - 273.15).toFixed(2),
      tempMax = parseFloat(data.main.temp_max - 273.15).toFixed(2),
      weather = data.weather[0].description;
    return (
      <div className="data_container">
        <h2>Current Weather in {name}.</h2>
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
