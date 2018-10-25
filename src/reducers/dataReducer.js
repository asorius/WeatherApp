import {
  GET_DEFAULT_DATA,
  SET_DEFAULT,
  GET_TARGET_DATA
} from '../actions/types';

const initialState = {
  key: 'b127290105cc88e28234e1b21708f515',
  default_city: 'stoke-on-trent',
  weatherData: {}
};
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_DEFAULT:
      return { ...state, default_city: action.payload };
    case GET_DEFAULT_DATA:
      return {
        ...state,
        weatherData: action.payload
      };
    case GET_TARGET_DATA:
      return { ...state, weatherData: action.payload };
    default:
      return state;
  }
}
