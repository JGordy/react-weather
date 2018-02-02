const services = {
  fetchGroupWeather: (payload) => {
    return fetch(`http://api.openweathermap.org/data/2.5/group?id=${payload}&units=imperial&APPID=23aa34fce77d5b7782d01b0917e6d2b6`)
      .then(response => {
        return response.json()
      })
      .then(data => {
        return data;
      })
  },
  fetchCityForecast: (payload) => {
    return fetch(`http://api.openweathermap.org/data/2.5/forecast?id=${payload}&units=imperial&APPID=23aa34fce77d5b7782d01b0917e6d2b6`)
    .then(response => {
      return response.json()
    })
    .then(data => {
      return data;
    })
  }
}

export default services;
