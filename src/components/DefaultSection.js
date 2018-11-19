import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setDefault } from '../actions/actions';

class DefaultSection extends Component {
  state = {
    typingTimeout2: null,
    text: '',
    preload: false,
    found: false,
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

        this.setState({ show: 'neither', found: false });
      }, 2000);
    } else {
      this.setState({ show: 'error' });
      setTimeout(() => {
        document.querySelector('#default').value = null;
        this.setState({ show: 'neither', found: false });
      }, 2000);
    }
  };
  checkLocation = async e => {
    this.setState({ preload: !this.state.preload });
    const input = e.target.value;
    clearTimeout(this.state.typingTimeout2);
    this.setState({
      typingTimeout2: setTimeout(this.callCheck, 1000),
      text: input,
      preload: true
    });
  };
  callCheck = async () => {
    const target = this.state.text;
    const { key } = this.props.data;
    this.setState({ preload: !this.state.preload });

    if (target.length !== 0) {
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${target.toLowerCase()}&APPID=${key}`
      );
      const responseJson = await response.json();
      console.log(responseJson);
      if (responseJson.cod === 200) {
        this.setState({
          found: !this.state.found,
          show: 'found'
        });
        setTimeout(() => {
          this.setState({ show: 'neither' });
        }, 2000);
      } else {
        this.setState({
          found: false,
          show: 'error'
        });
        setTimeout(() => {
          document.querySelector('#default').value = null;
          this.setState({ show: 'neither' });
        }, 2000);
      }
    }
  };

  render() {
    const { defaultCity } = this.props;
    return (
      <div className="col s12 m10 l3 pull-l8">
        <div className="row  defaultSetter ">
          <div className="col s10 ">
            <p className="center">
              Want to see a specific location everytime You come? Try setting a
              default location!
            </p>
          </div>

          <div className="col s12 ">
            <div className="row center ">
              <div className="input-field col s10 offset-s1 l8 offset-l2">
                <input type="text" id="default" onChange={this.checkLocation} />
                <label htmlFor="default">Enter location..</label>
                {this.state.show === 'error' ? (
                  <i className="material-icons red-text darken-4 right">
                    error_outline
                  </i>
                ) : null}
                {this.state.show === 'added' ? (
                  <div className="blue-text accent-1">
                    <h6>City succesfully added!</h6>
                    <i className="material-icons blue-text medium">done_all</i>
                  </div>
                ) : null}
                {this.state.show === 'found' ? (
                  <i className="material-icons yellow-text right">
                    check_circle_outline
                  </i>
                ) : null}

                {this.state.preload ? (
                  <div className="preloader-wrapper small active">
                    <div className="spinner-layer spinner-green-only">
                      <div className="circle-clipper left">
                        <div className="circle" />
                      </div>
                      <div className="gap-patch">
                        <div className="circle" />
                      </div>
                      <div className="circle-clipper right">
                        <div className="circle" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <button
                    type="submit"
                    onClick={this.setDefaultFunc}
                    className="btn"
                    disabled={!this.state.found}
                  >
                    Set as Default
                  </button>
                )}

                {defaultCity === '' ? null : (
                  <p>
                    Current default city:{' '}
                    <span className="teal-text">
                      {defaultCity.charAt(0).toUpperCase()}
                      {defaultCity.slice(1)}
                    </span>
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
