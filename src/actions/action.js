export const SET_DATA = "SET_DATA";
export const SET_CITY = "SET_CITY";

// setting the initial state to the data returned from the API call
export function setData(payload) {
  return {
    type: SET_DATA,
    payload: payload
  };
}
export function setCity(payload) {
  return {
    type: SET_CITY,
    payload: payload
  };
}

// calling the api for the group of cities to get weather data
export const getWeatherData = (payload) => {
  return(dispatch, getState) => {
    fetch(`http://api.openweathermap.org/data/2.5/group?id=${payload}&units=imperial&APPID=23aa34fce77d5b7782d01b0917e6d2b6`)
    .then(response => {
      return response.json()
    })
    .then(data => {
      dispatch(setData(data));
    })
  }
}

// API call to get forecast data for the selected city
export const getForecastByCityID = (payload) => {
  return(dispatch, getState) => {
    fetch(`http://api.openweathermap.org/data/2.5/forecast?id=${payload}&units=imperial&APPID=23aa34fce77d5b7782d01b0917e6d2b6`)
    .then(response => {
      return response.json()
    })
    .then(data => {
      dispatch(setCity(data))
    })
  }
}
