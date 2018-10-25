import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Data from './Data';
import { getDefaultData, setDefault, getTargetData } from '../actions/actions';
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
    this.props.getDefaultData({ key, default_city });
  }
  setDefaultFunc = e => {
    e.preventDefault();
    const value = document.querySelector('#default').value.toLowerCase();
    localStorage.setItem('default', value);
    this.props.setDefault(value);
  };
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
      this.setState({ preload: !this.state.preload });
      return;
    }
    const { key } = this.props.data;
    this.props.getTargetData({ key, target });
    this.setState({ preload: !this.state.preload });
  };

  render() {
    const { weatherData } = this.props.data;
    const { preload } = this.state;
    return (
      <div className="container col s12">
        <div className="defaultSetter row ">
          <div className="col offset-s3">
            <p>
              Want to see a specific location everytime You come? Try setting a
              default location!
            </p>
          </div>
          <div className="row">
            <div className="input-field col s4 offset-s4">
              <input type="text" id="default" />
              <label htmlFor="default">Enter location..</label>
              <button
                type="submit"
                onClick={this.setDefaultFunc}
                className="btn"
              >
                Set as Default
              </button>
            </div>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="input-field col s8 offset-s2">
            <input
              type="text"
              id="search"
              autoComplete="off"
              onChange={this.autoLoad}
            />
            <label htmlFor="search">Search for a location..</label>
          </div>
        </div>

        {weatherData.cod === 200 ? (
          <Data
            data={weatherData}
            error={{ error: false }}
            preloader={{ show: preload }}
          />
        ) : (
          <Data
            data={weatherData}
            error={{ error: true }}
            preloader={{ show: preload }}
          />
        )}
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
