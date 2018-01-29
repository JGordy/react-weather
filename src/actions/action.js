export const SET_DATA = "SET_DATA";

export function setData(payload) {
  return {
    type: SET_DATA,
    payload: payload
  };
}


// calling the api for the weather data
export const getWeatherData = (payload) => {
  return(dispatch, getState) => {
    fetch(`http://api.openweathermap.org/data/2.5/group?id=${payload}&units=metric&APPID=23aa34fce77d5b7782d01b0917e6d2b6`)
    .then(response => {
      return response.json()
    })
    .then(data => {
      dispatch(setData(data));
    })
  }
}
