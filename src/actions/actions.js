import { GET_DEFAULT_DATA, SET_DEFAULT, GET_TARGET_DATA } from './types';

const APICalls = async (target, key) => {
  try {
    const responseCurrent = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${target}&APPID=${key}&units=metric`
    );
    const responseForecast = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${target}&APPID=${key}&units=metric`
    );
    const current = await responseCurrent.json();
    const forecast = await responseForecast.json();
    return { current, forecast };
  } catch (e) {
    return { error: true };
  }
};
export const getDefaultData = creds => async dispatch => {
  const response = await APICalls(creds.default_city, creds.key);
  dispatch({
    type: GET_DEFAULT_DATA,
    payload: { current: response.current, forecast: response.forecast }
  });
};

export const setDefault = location => dispatch => {
  dispatch({
    type: SET_DEFAULT,
    payload: location
  });
};

export const getTargetData = ({ key, target }) => async dispatch => {
  const response = await APICalls(target, key);
  dispatch({
    type: GET_TARGET_DATA,
    payload: { current: response.current, forecast: response.forecast }
  });
};
