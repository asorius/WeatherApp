import React, { Component } from 'react';

class Data extends Component {
  render() {
    const { data } = this.props;
    const name = data.city.name,
      tempC = data.list[0].main.temp - 273.15,
      weather = data.list[0].weather[0].description;
    return (
      <div className="data_container">
        {name} is expecting {weather}
        with temperature of {parseFloat(tempC).toFixed(2)}
        C.
      </div>
    );
  }
}

export default Data;
