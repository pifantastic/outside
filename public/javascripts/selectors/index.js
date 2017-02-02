import {createSelector} from 'reselect';

const weatherSelector = state => state.weather.weather;
const allergiesSelector = state => state.allergies.allergies;

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

export const pollenSelector = createSelector(
  allergiesSelector,
  (allergies) => {
    const {forecast, isInitializing, isLoading} = allergies;

    if (isInitializing || isLoading) {
      return null;
    }

    const pollen = forecast[0];

    const levels = [  2.4,          4.8,      7.2,           9.6, Infinity];
    const names =  ['low', 'medium-low', 'medium', 'high-medium',   'high'];

    return names.find((name, index) => {
      return pollen <= levels[index];
    });
  }
)
