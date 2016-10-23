import {createSelector} from 'reselect';

const weatherSelector = state => state.weather.weather;

export const sunriseSelector = createSelector(
  weatherSelector,
  (weather) => {
    const today = weather.daily.data[0];
    return today ? today.sunriseTime : null;
  }
)

export const sunsetSelector = createSelector(
  weatherSelector,
  (weather) => {
    const today = weather.daily.data[0];
    return today ? today.sunsetTime : null;
  }
)
