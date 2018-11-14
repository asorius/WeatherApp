import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Forecast extends Component {
  render() {
    const detailedData = this.props.data.list.slice(0, 4);
    return (
      <div className="row ">
        <div className="container center">
          <h5>12 Hour forecast:</h5>
          <div class="divider" />
          <div className="row center forecast_container ">
            {detailedData.map((period, index) => {
              const time = period.dt_txt,
                temp = period.main.temp,
                weatherDescription = period.weather[0].description;
              return (
                <div
                  className="col s2 card-panel teal white-text singleCard"
                  key={index}
                >
                  <div className="row ">
                    <div className="col s12">
                      <div className="row">{time}</div>
                      <div className="row temp">
                        <h4>{temp} C</h4>
                      </div>
                      <div className="row">{weatherDescription}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
Forecast.propTypes = {
  data: PropTypes.object.isRequired
};
const mapStateToProps = state => ({ data: state.data.forecastData });
export default connect(mapStateToProps)(Forecast);
