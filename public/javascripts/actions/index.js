import $ from 'jquery';

export const FETCH_WEATHER = 'FETCH_WEATHER';
export const RECEIVE_WEATHER = 'RECEIVE_WEATHER';
export const FETCH_WEATHER_ERROR = 'FETCH_WEATHER_ERROR';

export const fetchWeather = () => dispatch => {
  dispatch({type: FETCH_WEATHER});

  return fetch('/ajax/weather')
    .then((response) => {
      const json = response.json();

      if (response.status === 200) {
        return dispatch({
          type: RECEIVE_WEATHER,
          weather: json,
        });
      }
      else {
        json.then(({error}) => {
          return dispatch({
            type: FETCH_WEATHER_ERROR,
            error: error.message,
          });
        });
      }
    })
    .catch((response) => {
      return dispatch({
          type: FETCH_WEATHER_ERROR,
          error: response.statusText,
        });
    });
}
