import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Data from './Data';
import { getDefaultData, setDefault, getTargetData } from '../actions/actions';
import DefaultSection from './DefaultSection';
import Forecast from './Forecast';
import Error from './Error';
class Main extends Component {
  state = {
    typingTimeout: null,
    text: '',
    preload: false
  };
  componentDidMount() {
    let { key, default_city } = this.props.data;
    if (localStorage.getItem('default') !== null) {
      default_city = localStorage.getItem('default');
    }
    this.props.setDefault(default_city);
    this.props.getDefaultData({ key, default_city });
  }
  autoLoad = async e => {
    this.setState({ preload: !this.state.preload });
    const input = e.target.value;
    clearTimeout(this.state.typingTimeout);
    this.setState({
      typingTimeout: setTimeout(this.callSearch, 1000),
      text: input,
      preload: true
    });
  };
  callSearch = async () => {
    const target = this.state.text;
    if (target.length === 0) {
      let { key, default_city } = this.props.data;
      if (localStorage.getItem('default') !== null) {
        default_city = localStorage.getItem('default');
      }
      this.setState({
        typingTimeout: setTimeout(
          this.props.getDefaultData({ key, default_city }),
          1000
        ),
        text: '',
        preload: true
      });
      this.setState({ preload: !this.state.preload });
    } else {
      const { key } = this.props.data;
      this.props.getTargetData({ key, target });
      this.setState({ preload: !this.state.preload });
    }
  };

  render() {
    const { weatherData, forecastData } = this.props.data;
    const { preload } = this.state;
    return (
      <div className="row ">
        <DefaultSection defaultCity={this.props.data.default_city} />
        <div className="mainSearch center col s9 ">
          <div className="row s12 center">
            <div className="input-field col s4 offset-s4">
              <input
                type="text"
                id="search"
                autoComplete="off"
                onChange={this.autoLoad}
              />
              <label htmlFor="search">
                Start typing to search for a location..
              </label>
            </div>
            <div className="col s12">
              {weatherData.cod === 200 ? (
                <React.Fragment>
                  <Data
                    data={weatherData}
                    forecast={forecastData}
                    preloader={{ show: preload }}
                  />
                  <Forecast />
                </React.Fragment>
              ) : (
                <Error preloader={{ show: preload }} />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Main.propTypes = {
  data: PropTypes.object.isRequired,
  getDefaultData: PropTypes.func.isRequired,
  setDefault: PropTypes.func.isRequired,
  getTargetData: PropTypes.func.isRequired
};
const mapStateToProps = state => ({ data: state.data });
export default connect(
  mapStateToProps,
  { getDefaultData, setDefault, getTargetData }
)(Main);
