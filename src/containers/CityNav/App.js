import React, { Component } from 'react';
import './App.css';
import PLACES from '../../constants/places';
import WeatherDisplay from '../../containers/WeatherDisplay/WeatherDisplay';
import { connect } from 'react-redux';
import { getWeatherData } from '../../actions/action';
import * as Typeicons from 'react-icons/lib/ti';


class App extends Component {
  constructor() {
    super()
    this.state = {
      activePlace: 0
    }
  }

  getCityIds = (cities) => {
    let cityIdList = [];
    cities.forEach(index => {
      cityIdList.push(index.id);
    });
    return cityIdList.join(',');
  }

  handleWeatherIcon = (weather) => {
    // console.log(weather);
    switch (weather) {
      case 'Clear':
        return <Typeicons.TiWeatherSunny />;
      case 'Snow':
        return <Typeicons.TiWeatherSnow />;
      case 'Haze':
        return <Typeicons.TiWaves />;
      case 'Rain' || "Drizzle":
        return <Typeicons.TiWeatherShower />;
      case 'Clouds':
        return <Typeicons.TiWeatherCloudy />;
      default:
        return <Typeicons.TiWeatherPartlySunny />;
    }
  }

  handleTempColor = (temp) => {
    if (temp > 80) {
      return 'red';
    } else if (temp > 65) {
      return 'gold'
    } else if (temp > 49) {
      return 'springgreen';
    } else if (temp > 32) {
      return 'midnightblue';
    } else {
      return 'orchid';
    }
  }

  componentDidMount() {
    this.props.getWeatherData(this.getCityIds(PLACES));
  }

  render() {
    const activePlace = this.state.activePlace;
    let weather = this.props.weatherData
    // console.log(weather);
    let buttonDisplay = PLACES.map((place, index) => {
      let buttonStyle, tempColor, weatherIcon;

      if (weather) {
        let temp = weather.list[index].main.temp.toFixed(0);
        tempColor = this.handleTempColor(temp);
        weatherIcon = this.handleWeatherIcon(weather.list[index].weather[0].main);

        buttonStyle = {
              background: `linear-gradient(125deg, rgba(0,0,0,0.2) 65%, ${tempColor} 115%)`
            };

      }

      return <div className='city-buttons'
               style={buttonStyle}
               key={index}
               onClick={() => {
                 this.setState({ activePlace: index });
               }}>
               <div className='name-holder'>
                 <h3>{place.name}</h3>
                 <h2>{weather ? weather.list[index].weather[0].description : ''}</h2>
               </div>
               <div className='city-weather'>
                 <h1>{weather ? weather.list[index].main.temp.toFixed(0) + '˚': ''}</h1>
                 <h5>{weather ? weather.list[index].main.temp_max.toFixed(0) + "˚/" +weather.list[index].main.temp_min.toFixed(0) + '˚': ''}</h5>
               </div>
               <div className='weather-icon'>
                {weatherIcon}
               </div>
             </div>
    });

    return (
      <div className="App">

      <div className='city-nav'>
        {buttonDisplay}
      </div>

      <WeatherDisplay key={activePlace}
          place={PLACES[activePlace]}
          dailyWeather={this.props.weatherData ? weather.list[activePlace] : ''} />

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    weatherData: state.weatherData
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getWeatherData: (payload) => dispatch(getWeatherData(payload))
    }
}

export default connect(mapStateToProps,  mapDispatchToProps)(App);
