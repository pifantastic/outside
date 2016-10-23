import {combineReducers} from 'redux'
import {
  FETCH_WEATHER,
  RECEIVE_WEATHER,
  FETCH_WEATHER_ERROR,
} from '../actions';

const DEFAULT_STATE = {
  isInitializing: true,
  isLoading: false,
  error: null,
  weather: {
    currently: {
      apparentTemperature: 0,
      humidity: 0,
      summary: '',
    },
    hourly: {
      data: [],
    },
    daily: {
      data: [],
    },
  },
};

const weather = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case FETCH_WEATHER:
      return {
        ...state,
        isLoading: true,
      };
    case RECEIVE_WEATHER:
      return {
        ...state,
        isLoading: false,
        isInitializing: false,
        error: null,
        weather: action.weather,
      };
    case FETCH_WEATHER_ERROR:
      return {
        ...state,
        isLoading: false,
        isInitializing: false,
        error: action.error,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  weather,
});

export default rootReducer;
