import React, { Component } from 'react';
import './App.css';
import PLACES from '../../constants/places';
import WeatherDisplay from '../../containers/WeatherDisplay/WeatherDisplay';
import { connect } from 'react-redux';
import { getWeatherData } from '../../actions/action';


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

  componentDidMount() {
    this.props.getWeatherData(this.getCityIds(PLACES));
  }

  render() {

    const activePlace = this.state.activePlace;

    let buttonDisplay = PLACES.map((place, index) => {
      return <div key={index}
               onClick={() => {
                 this.setState({ activePlace: index });
               }}>
               <h3>{place.name}</h3>
               <h2>{this.props.weatherData ? this.props.weatherData.list[index].main.temp: ''}</h2>
             </div>
    });

    return (
      <div className="App">

      <div className='city-nav'>
        {buttonDisplay}
      </div>

      <WeatherDisplay key={activePlace}
          place={PLACES[activePlace]} />

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
