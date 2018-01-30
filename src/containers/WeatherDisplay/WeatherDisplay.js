import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getForecastByCityID } from '../../actions/action';
import './WeatherDisplay.css';
import * as Typeicons from 'react-icons/lib/ti';

class WeatherDisplay extends Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     cityForecast: ''
  //   }
  // }

  componentDidMount() {
    this.props.getForecastByCityID(this.props.place.id);
    // this.setState({cityForecast: this.props.cityForecast});
  }

  render() {
    console.log("PRAWPS----> ", this.props);
    let dailyWeather = this.props.dailyWeather,
        cityForecast = this.props.cityForecast,
        city = this.props.place,
        hourlyWeather;
    if (cityForecast) {
      hourlyWeather = cityForecast.list.map((hour, index) => {
        // console.log("HOUR---->",hour);
        return <div className='hours' key={index}>
                 <h3>{hour.dt_txt}</h3>
                 <h2>{hour.main.temp.toFixed(0) + "˚"}</h2>
               </div>
      })
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

        <div>
          {cityForecast ? hourlyWeather : ''}
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
