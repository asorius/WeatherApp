import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Data from './Data';
import { getDefaultData, setDefault, getTargetData } from '../actions/actions';
import DefaultSection from './DefaultSection';
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
    console.log(weatherData);
    const { preload } = this.state;
    if (weatherData.cod === 404) {
      return <Error preloader={{ show: preload }} />;
    } else {
      return (
        <div className="row ">
          <div className="mainSearch center col s12 m10 offset-m1 l8 push-l3">
            <div className="row s12 center ">
              <div className="input-field col s10 offset-s1 l4 offset-l3">
                <div className="divider" />

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
              <div className="col s12 ">
                {weatherData.cod === 200 ? (
                  <Data
                    data={weatherData}
                    forecast={forecastData}
                    preloader={{ show: preload }}
                  />
                ) : (
                  <Error preloader={{ show: preload }} />
                )}
              </div>
            </div>
          </div>
          <DefaultSection defaultCity={this.props.data.default_city} />
        </div>
      );
    }
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
