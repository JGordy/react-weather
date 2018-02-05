import React, { Component } from 'react';
// had to import the prop-types package b/c it is deprecated in React v.16+
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getForecastByCityID } from '../../actions/action';
import './WeatherDisplay.css';
import utils from '../../utilities/utils';

class WeatherDisplay extends Component {

  filterForecastData = (forecastData) => {
    let date = forecastData[0].dt_txt.split(' ')[0];
    
    let forecast = forecastData.map((hour, index) => {
      let dailyTitle =
          <div className="daily-title" key={hour.dt_txt.split(' ')[0]}>
            {utils.getDay(hour.dt_txt.split(' ')[0])}
          </div>;

      let hourlyWeatherJSX =
          <div className='hourly-block' key={index}>
            <h3 className="hour">
              {utils.convertStringToHour(hour.dt_txt)}
            </h3>
            <p className="hourly-temp">{hour.main.temp.toFixed(0) + "˚"}</p>
            <div className="hourly-icon">
              {utils.handleWeatherIcon(hour.weather[0].main)}
            </div>
          </div>;

      if (index === 0) {
        return [dailyTitle, hourlyWeatherJSX];
      } else if (hour.dt_txt.includes(date)) {
        return hourlyWeatherJSX;
      } else {
        date = hour.dt_txt.split(' ')[0];
        return [dailyTitle, hourlyWeatherJSX];
      }

    });
    return forecast;
  };

  componentDidMount() {
    this.props.getForecastByCityID("forecast?id=" + this.props.place.id);
  };

  render() {
    let dailyWeather = this.props.dailyWeather,
        cityForecast = this.props.cityForecast,
        city = this.props.place,
        forecast;

    if (cityForecast && dailyWeather) {
       forecast = this.filterForecastData(cityForecast.list);
    };

    return(
      <div className='WeatherDisplay'>

        <div className="daily-weather" id="daily-weather">
          <div className="city-background">{city.name}</div>
          <h3>{dailyWeather ? "Currently " + dailyWeather.weather[0].description : ""}</h3>
          <div>
            <h2>High: {dailyWeather ? dailyWeather.main.temp_max.toFixed(0) + "˚" : ''}</h2>
            <h2>Low: {dailyWeather ? dailyWeather.main.temp_min.toFixed(0) + "˚" : ''}</h2>
          </div>
        </div>

        <div className="forecast-info">
          {forecast ? forecast.map(item => {
             return item;
          }) : ''}
        </div>

      </div>
    )
  }
};

// had to import the prop-types package b/c it is deprecated in React v.16
WeatherDisplay.propTypes = {
  place: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    zip: PropTypes.string
  }).isRequired,
  dailWeather: PropTypes.shape({
    clouds: PropTypes.object,
    coord: PropTypes.object,
    dt: PropTypes.number,
    id: PropTypes.string,
    main: PropTypes.object,
    name: PropTypes.string,
    sys: PropTypes.object,
    visibility: PropTypes.number,
    weather: PropTypes.array,
    wind: PropTypes.object
  })
};

const mapStateToProps = (state) => {
  return {
    cityForecast: state.cityForecast
  }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getForecastByCityID: (payload) => dispatch(getForecastByCityID(payload))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(WeatherDisplay);
