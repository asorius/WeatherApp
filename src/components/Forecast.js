import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Forecast extends Component {
  render() {
    const detailedData = this.props.data.list.slice(0, 4);
    return (
      <div className="row mycontainer ">
        <div className="divider grey" />

        <div className="col s12  l12 ">
          <div className="row">
            <h5>12 Hour forecast:</h5>
          </div>
          <div className="row fl ">
            {detailedData.map((period, index) => {
              const time = period.dt_txt,
                temp = Math.round(period.main.temp),
                weatherDescription = period.weather[0].description,
                icon = period.weather[0].icon;
              let url = 'http://openweathermap.org/img/w/' + icon + '.png';
              return (
                <div
                  className="col center s10 offset-s1 m2 l2 teal lighten-1 white-text singleCard"
                  key={index}
                >
                  <div>{time.substring(0, time.length - 3)}</div>
                  <div className="temp">
                    <h4>{temp} &#8451;</h4>
                  </div>
                  <div>{weatherDescription}</div>
                  <div
                    className="icon-img"
                    // style={{ backgroundImage: `url(${url})` }}
                  >
                    <img className="responsive-img" src={url} alt="" />
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
