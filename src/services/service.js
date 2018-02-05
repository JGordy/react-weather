const services = {
  fetchWeatherData: (payload) => {
    return fetch(`http://api.openweathermap.org/data/2.5/${payload}&units=imperial&APPID=23aa34fce77d5b7782d01b0917e6d2b6`)
    .then(response => {
      return response.json()
    })
    .then(data => {
      return data;
    })
  }
}

export default services;
