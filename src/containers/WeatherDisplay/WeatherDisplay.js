import React, { Component } from 'react';
// had to import the prop-types package b/c it is deprecated in React v.16+
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getForecastByCityID } from '../../actions/action';
import './WeatherDisplay.css';
import utils from '../../utilities/utils';

class WeatherDisplay extends Component {

  filterForecastData = (forecastData) => {

    let firstDate = forecastData[0].dt_txt.split(" ")[0],
        dayOne = [],
        secondDate,
        dayTwo = [],
        thirdDate,
        dayThree = [],
        fourthDate,
        dayFour = [],
        fifthDate,
        dayFive = [],
        sixthDate,
        daySix = [],
        forecast = []

    forecastData.map(hour => {
      if (forecast.length === 0) {
        forecast.push(firstDate)
        dayOne.push(hour);
      } else if (hour.dt_txt.includes(firstDate)) {
        dayOne.push(hour);
      } else if (secondDate === undefined) {
        secondDate = hour.dt_txt.split(" ")[0];
        dayTwo.push(hour);
      } else if (hour.dt_txt.includes(secondDate)) {
        dayTwo.push(hour);
      } else if (thirdDate === undefined) {
        thirdDate = hour.dt_txt.split(" ")[0];
        dayThree.push(hour);
      } else if (hour.dt_txt.includes(thirdDate)) {
        dayThree.push(hour);
      } else if (fourthDate === undefined) {
        fourthDate = hour.dt_txt.split(" ")[0];
        dayFour.push(hour);
      } else if (hour.dt_txt.includes(fourthDate)) {
        dayFour.push(hour);
      } else if (fifthDate === undefined) {
        fifthDate = hour.dt_txt.split(" ")[0];
        dayFive.push(hour);
      } else if (hour.dt_txt.includes(fifthDate)) {
        dayFive.push(hour);
      } else if (sixthDate === undefined) {
        sixthDate = hour.dt_txt.split(" ")[0];
        daySix.push(hour);
      } else if (hour.dt_txt.includes(sixthDate)) {
        daySix.push(hour);
      }
      return forecast;
    });

    forecast.push(dayOne, secondDate, dayTwo, thirdDate, dayThree, fourthDate, dayFour, fifthDate, dayFive, sixthDate, daySix);
    return forecast;
  };

  componentDidMount() {
    this.props.getForecastByCityID(this.props.place.id);
  };

  render() {
    let dailyWeather = this.props.dailyWeather,
        cityForecast = this.props.cityForecast,
        city = this.props.place,
        forecast;

    if (cityForecast && dailyWeather) {
       forecast = this.filterForecastData(cityForecast.list);
    }

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
          {cityForecast && dailyWeather ? forecast.map((item, index) => {
            if (typeof item === "string") {
              return <div className="daily-title" key={index}>
                      {utils.getDay(item)}
                     </div>
            } else {
              return <div className="forecast-block" key={index}>
                       {item ? item.map((hour, index) => {
                         return <div className="hourly-block" key={index}>
                                  <h3 className="hour">{utils.convertStringToHour(hour.dt_txt)}</h3>
                                  <p className="hourly-temp">{hour.main.temp.toFixed(0) + "˚"}</p>
                                  <div className="hourly-icon">{utils.handleWeatherIcon(hour.weather[0].main)}</div>
                                 </div>
                       }) : ''}
                     </div>
            }
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

export default connect(mapStateToProps,  mapDispatchToProps)(WeatherDisplay);
