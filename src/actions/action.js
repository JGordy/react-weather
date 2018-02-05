import services from '../services/service';
export const SET_DATA = "SET_DATA";
export const SET_CITY = "SET_CITY";

// setting the initial state to the data returned from the API call
const makeActionCreator = function (actionType) {
  return function (payload) {
    return {
      type: actionType,
      payload: payload
    }
  }
};
export const setData = makeActionCreator(SET_DATA);
export const setCity = makeActionCreator(SET_CITY);

// calling the api for the group of cities to get weather data
export const getWeatherData = (payload) => {
  return(dispatch, getState) => {
    return services.fetchWeatherData(payload)
           .then(data => {
             dispatch(setData(data))
           })
  };
};

// API call to get forecast data for the selected city
export const getForecastByCityID = (payload) => {
  return(dispatch, getState) => {
    return services.fetchWeatherData(payload)
           .then(data => {
             dispatch(setCity(data))
           })
  };
};
