import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Data from './Data';
import { getDefaultData } from '../actions/actions';
class Main extends Component {
  componentDidMount() {
    const { key, default_city_id } = this.props.data;
    this.props.getDefaultData({ key, default_city_id });
  }
  render() {
    const { weatherData } = this.props.data;
    return (
      <div className="container">
        <input type="text" name="" id="lol" placeholder="set default" />
        <button type="submit">set</button>
        <input type="text" name="" id="search" placeholder="search.." />
        <button type="submit">get</button>
        {weatherData.city ? (
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
