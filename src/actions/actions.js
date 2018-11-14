import { GET_DEFAULT_DATA, SET_DEFAULT, GET_TARGET_DATA } from './types';
import Axios from 'axios';

export const getDefaultData = creds => async dispatch => {
  const response = await Axios.get(
    `http://api.openweathermap.org/data/2.5/weather?q=${
      creds.default_city
    }&APPID=${creds.key}&units=metric`
  );
  const responseForecast = await Axios.get(
    `http://api.openweathermap.org/data/2.5/forecast?q=${
      creds.default_city
    }&APPID=${creds.key}&units=metric`
  );
  const responseData = await response.data;
  const respFor = await responseForecast.data;
  dispatch({
    type: GET_DEFAULT_DATA,
    payload: { current: responseData, forecast: respFor }
  });
};
export const setDefault = location => dispatch => {
  dispatch({
    type: SET_DEFAULT,
    payload: location
  });
};
export const getTargetData = ({ key, target }) => async dispatch => {
  const response = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${target}&APPID=${key}&units=metric`
  );
  let responseData = await response.json();
  if (responseData.cod === '404') {
    responseData = { error: true };
  }
  dispatch({
    type: GET_TARGET_DATA,
    payload: responseData
    //AIzaSyBJpOSfZ7ox4FZau_RaPCXtx3kJPy4Mmkc google key
    // https://maps.googleapis.com/maps/api/place/autocomplete/json?input=kaun&&types=(cities)&key=AIzaSyBJpOSfZ7ox4FZau_RaPCXtx3kJPy4Mmkc
  });
};
