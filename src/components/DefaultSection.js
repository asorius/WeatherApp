import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setDefault } from '../actions/actions';

class DefaultSection extends Component {
  state = {
    show: 'neither'
  };

  setDefaultFunc = async e => {
    e.preventDefault();
    let value = document.querySelector('#default').value;
    let { key } = this.props.data;
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${value.toLowerCase()}&APPID=${key}`
    );
    const responseData = await response.json();
    if (responseData.cod === 200) {
      localStorage.setItem('default', value);
      this.props.setDefault(value);
      this.setState({ show: 'added', currentDefault: value });
      setTimeout(() => {
        document.querySelector('#default').value = null;

        this.setState({ show: 'neither' });
      }, 2000);
    } else {
      this.setState({ show: 'error' });
      setTimeout(() => {
        document.querySelector('#default').value = null;
        this.setState({ show: 'neither' });
      }, 2000);
    }
  };

  render() {
    const { defaultCity } = this.props;
    return (
      <div className="defaultSetter col s3 ">
        <div className="row  ">
          <div className="col s10 ">
            <p className="center">
              Want to see a specific location everytime You come? Try setting a
              default location!
            </p>
          </div>

          <div className="col s12  ">
            <div className="row center ">
              <div className="input-field col s6 offset-s3">
                <input type="text" id="default" />
                <label htmlFor="default">Enter location..</label>
                {this.state.show === 'error' ? (
                  <div className="red darken-4">
                    <span className="white-text">Location not found..</span>
                  </div>
                ) : null}
                {this.state.show === 'added' ? (
                  <div className="lime accent-1">
                    <span>City succesfully added!</span>
                  </div>
                ) : null}
                <button
                  type="submit"
                  onClick={this.setDefaultFunc}
                  className="btn"
                >
                  Set as Default
                </button>
                {defaultCity === '' ? null : (
                  <p>
                    Current default city: {defaultCity.charAt(0).toUpperCase()}
                    {defaultCity.slice(1)}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
DefaultSection.propTypes = {
  data: PropTypes.object.isRequired,
  setDefault: PropTypes.func.isRequired
};
const mapStateToProps = state => ({ data: state.data });
export default connect(
  mapStateToProps,
  { setDefault }
)(DefaultSection);
