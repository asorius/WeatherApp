import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Data from './Data';
import { getDefaultData } from '../actions/actions';
class Main extends Component {
  state = {
    typingTimeout: null,
    text: ''
  };
  componentDidMount() {
    let { key, default_city_id } = this.props.data;
    if (localStorage.getItem('default') !== null) {
      default_city_id = localStorage.getItem('default');
    }
    console.log({ key, default_city_id });
    this.props.getDefaultData({ key, default_city_id });
  }
  setDefault = e => {
    e.preventDefault();
    const value = document.querySelector('#default').value.toLowerCase();
    localStorage.setItem('default', value);
    return { message: 'success' };
  };
  autoSuggest = async e => {
    const input = e.target.value;
    clearTimeout(this.state.typingTimeout);
    this.setState({
      typingTimeout: setTimeout(this.callSearch, 1500),
      text: input
    });
  };
  callSearch = async () => {
    const text = this.state.text;
    const { key } = this.props.data;
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${text}&APPID=${key}`
    );
    const responseData = await response.json();
    responseData.message ? console.log('not found') : console.log(responseData);
    //--------------Google places for drop down return CORB error....
    // const key = 'AIzaSyBJpOSfZ7ox4FZau_RaPCXtx3kJPy4Mmkc';
    // try {
    //   const response = await axios({
    //     method: 'get',
    //     url: `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${text}&&types=(cities)&key=${key}`,
    //     headers: {
    //       'Access-Control-Allow-Origin': '*'
    //     }
    //   });
    //   const list = response.data.map(res => res.description);
    //   console.log(list);
    // } catch (e) {
    //   console.log(e);
    // }
  };

  render() {
    const { weatherData } = this.props.data;
    return (
      <div className="container">
        <input type="text" name="" id="default" placeholder="set default" />
        <button type="submit" onClick={this.setDefault}>
          set
        </button>
        <br />
        <input
          type="text"
          name=""
          id="search"
          placeholder="search.."
          autoComplete="off"
          onChange={this.autoSuggest}
        />
        {weatherData.cod === 200 ? (
          <Data data={weatherData} />
        ) : (
          'Could not find anything....'
        )}
      </div>
    );
  }
}
Main.propTypes = {
  data: PropTypes.object.isRequired,
  getDefaultData: PropTypes.func.isRequired
};
const mapStateToProps = state => ({ data: state.data });
export default connect(
  mapStateToProps,
  { getDefaultData }
)(Main);
