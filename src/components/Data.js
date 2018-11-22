import React, { Component } from 'react';
import Preloader from './Preloader';
import list from './abbreviations';
import Forecast from './Forecast';

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
      <React.Fragment>
        <div className="row">
          <div className="data_container container">
            <h4>
              Current Weather in {name},{list[country]}.
            </h4>
            <div className="details">
              <h5>
                {weather} with temperature of {Math.round(temp)} &#8451;.
              </h5>
            </div>
          </div>
        </div>
        <Forecast />
      </React.Fragment>
    );
  }
}

export default Data;
