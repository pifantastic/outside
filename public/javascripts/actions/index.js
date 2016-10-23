import $ from 'jquery';

export const FETCH_WEATHER = 'FETCH_WEATHER';
export const RECEIVE_WEATHER = 'RECEIVE_WEATHER';


export const fetchWeather = () => dispatch => {
  dispatch({type: FETCH_WEATHER});

  return fetch('/ajax/weather')
    .then(response => response.json())
    .then(json => dispatch({
      type: RECEIVE_WEATHER,
      weather: json,
    }));
}
