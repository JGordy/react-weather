import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getForecastByCityID } from '../../actions/action';
import './WeatherDisplay.css';
// import * as Typeicons from 'react-icons/lib/ti';

class WeatherDisplay extends Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     cityForecast: {}
  //   }
  // }

  filterForecastData = (forecastData) => {
    // let forecast = {
    //       firstDate: forecastData[0].dt_txt.split(" ")[0],
    //       dayOne: [],
    //       secondDate: [],
    //       dayTwo: [],
    //       thirdDate: [],
    //       dayThree: [],
    //       fourthDate: [],
    //       dayFour: [],
    //       fifthDate: [],
    //       dayFive: [],
    //       sixthDate: [],
    //       daySix: []
    //     };

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
    });
    forecast.push(dayOne, secondDate, dayTwo, thirdDate, dayThree, fourthDate, dayFour, fifthDate, dayFive, sixthDate, daySix);
    return forecast;
  }

  componentDidMount() {
    this.props.getForecastByCityID(this.props.place.id);
    // this.setState({cityForecast: this.props.cityForecast});
  }

  render() {
    let dailyWeather = this.props.dailyWeather,
        cityForecast = this.props.cityForecast,
        city = this.props.place,
        hourlyWeather,
        forecast;

    if (cityForecast && dailyWeather) {
       forecast = this.filterForecastData(cityForecast.list);
       // console.log("forecast----> ", forecast);
    }

    return(
      <div className='WeatherDisplay'>
        <div className="daily-weather">
          <h3>{dailyWeather ? dailyWeather.weather[0].description + " today " : "Forecast "} for {city.name}</h3>
          <div>
            <h2>High: {dailyWeather ? dailyWeather.main.temp_max.toFixed(0) + "˚" : ''}</h2>
            <h2>Low: {dailyWeather ? dailyWeather.main.temp_min.toFixed(0) + "˚" : ''}</h2>
          </div>
        </div>

        <div className="forecast-info">
          {cityForecast && dailyWeather ? forecast.map((item, index) => {
            if (typeof item === "string") {
              return <div className="daily-title" key={index}>
                      {item}
                     </div>
            } else {
              return <div className="forecast-block" key={index}>
                       {item.map((hour, index) => {
                         return <div className="hourly-block" key={index}>
                                  {hour.main.temp.toFixed(0) + "˚"}
                                 </div>
                       })}
                     </div>
            }
          }) : ''}
        </div>
      </div>
    )
  }
};

const mapStateToProps = (state) => {
  return {
    cityForecast: state.cityForecast
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getForecastByCityID: (payload) => dispatch(getForecastByCityID(payload))
    }
}

export default connect(mapStateToProps,  mapDispatchToProps)(WeatherDisplay);
