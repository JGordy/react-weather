import services from '../services/service';
export const SET_DATA = "SET_DATA";
export const SET_CITY = "SET_CITY";

// setting the initial state to the data returned from the API call
export function setData(payload) {
  return {
    type: SET_DATA,
    payload: payload
  };
};
export function setCity(payload) {
  return {
    type: SET_CITY,
    payload: payload
  };
};

// calling the api for the group of cities to get weather data
export const getWeatherData = (payload) => {
  return(dispatch, getState) => {
    return services.fetchGroupWeather(payload)
           .then(data => {
             dispatch(setData(data))
           })
  };
};

// API call to get forecast data for the selected city
export const getForecastByCityID = (payload) => {
  return(dispatch, getState) => {
    return services.fetchCityForecast(payload)
           .then(data => {
             dispatch(setCity(data))
           })
  };
};
