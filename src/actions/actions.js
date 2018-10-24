import { GET_DEFAULT_DATA, SET_DEFAULT, GET_TARGET_DATA } from './types';
import Axios from 'axios';

export const getDefaultData = creds => async dispatch => {
  const response = await Axios.get(
    `http://api.openweathermap.org/data/2.5/weather?q=${
      creds.default_city_id
    }&APPID=${creds.key}`
  );
  const responseData = await response.data;

  dispatch({
    type: GET_DEFAULT_DATA,
    payload: responseData
  });
};
export const setDefault = location => {
  return {
    type: SET_DEFAULT,
    payload: location
  };
};
export const getTargetData = ({ creds, target }) => {
  return {
    type: GET_TARGET_DATA
    // payload: response
    //AIzaSyBJpOSfZ7ox4FZau_RaPCXtx3kJPy4Mmkc google key
    // https://maps.googleapis.com/maps/api/place/autocomplete/json?input=kaun&&types=(cities)&key=AIzaSyBJpOSfZ7ox4FZau_RaPCXtx3kJPy4Mmkc
  };
};
