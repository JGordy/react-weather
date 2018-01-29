import React, { Component } from 'react';
import '../styles/App.css';
import PLACES from '../constants/places';
import WeatherDisplay from '../containers/WeatherDisplay';
import { connect } from 'react-redux';
import { getWeatherData } from '../actions/action';


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
    this.props.getWeatherData(this.getCityIds(PLACES))
  }

  render() {
    console.log("Weather Data: ",this.props.weatherData);
    if (this.props.weatherData) {
      console.log(this.props.weatherData.list);
    }
    const activePlace = this.state.activePlace;

    let buttonDisplay = PLACES.map((place, index) => {
      return <button key={index}
               onClick={() => {
                 this.setState({ activePlace: index });
               }}>
               {place.name}
             </button>
    });

    return (
      <div className="App">

      {buttonDisplay}

      <WeatherDisplay key={activePlace}
          zip={PLACES[activePlace].zip} />

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
