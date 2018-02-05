import React, { Component } from 'react';
import './CityNav.css';
import PLACES from '../../constants/places';
import WeatherDisplay from '../../containers/WeatherDisplay/WeatherDisplay';
import TopButton from '../../components/topButton/topButton';
import { connect } from 'react-redux';
import { getWeatherData } from '../../actions/action';
import utils from '../../utilities/utils';

class App extends Component {
  constructor() {
    super()
    this.state = {
      activePlace: 0
    }
  };

  handleClick = (element, index) => {
    this.setState({activePlace: index});
    utils.scrollTo(element);
  };

  componentDidMount() {
    this.props.getWeatherData("group?id=" + utils.getCityIds(PLACES));
  };

  render() {
    const activePlace = this.state.activePlace;
    let weather = this.props.weatherData;
    let buttonDisplay = PLACES.map((place, index) => {
      let buttonStyle, tempColor, weatherIcon;
      if (weather) {
        let temp = weather.list[index].main.temp.toFixed(0);
        tempColor = utils.handleTempColor(temp);
        weatherIcon = utils.handleWeatherIcon(weather.list[index].weather[0].main);

        buttonStyle = {
              background: `linear-gradient(125deg, rgba(0,0,0,0.2) 65%, ${tempColor} 115%)`
            };

      };

      return <div className='city-buttons'
               style={buttonStyle}
               key={index}
               onClick={() => {
                 this.handleClick("daily-weather" ,index);
               }}>
               <div className='name-holder'>
                 <h3>{place.name}</h3>
                 <h2>{weather ? weather.list[index].weather[0].description : ''}</h2>
               </div>
               <div className='city-weather'>
                 <h1>{weather ? weather.list[index].main.temp.toFixed(0) + '˚': ''}</h1>
                 <h5>{weather ? weather.list[index].main.temp_max.toFixed(0) + "˚/ " +weather.list[index].main.temp_min.toFixed(0) + '˚': ''}</h5>
               </div>
               <div className='weather-icon'>
                {weatherIcon}
               </div>
             </div>
    });

    return (
      <div className="App">

        <div className='city-nav' id='Top'>
          <h1 className="title">My Weather</h1>
          {buttonDisplay}
        </div>

        <WeatherDisplay key={activePlace}
            place={PLACES[activePlace]}
            dailyWeather={this.props.weatherData ? weather.list[activePlace] : ''} />

        <TopButton />

      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    weatherData: state.weatherData
  }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getWeatherData: (payload) => dispatch(getWeatherData(payload))
    }
};

export default connect(mapStateToProps,  mapDispatchToProps)(App);
