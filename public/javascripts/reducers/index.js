import {combineReducers} from 'redux'
import {
  FETCH_WEATHER,
  RECEIVE_WEATHER,
  FETCH_WEATHER_ERROR,
  FETCH_ALLERGIES,
  RECEIVE_ALLERGIES,
  FETCH_ALLERGIES_ERROR,
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

const DEFAULT_ALLERGIES_STATE = {
  isInitializing: true,
  isLoading: false,
  error: null,
  allergies: {
    zip: '',
    city: '',
    state: '',
    forecast: [],
    pp: '',
    timestamp: '',
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

const allergies = (state = DEFAULT_ALLERGIES_STATE, action) => {
  switch (action.type) {
    case FETCH_ALLERGIES:
      return {
        ...state,
        isLoading: true,
      };
    case RECEIVE_ALLERGIES:
      return {
        ...state,
        isLoading: false,
        isInitializing: false,
        error: null,
        allergies: action.allergies,
      };
    case FETCH_ALLERGIES_ERROR:
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
  allergies,
});

export default rootReducer;
