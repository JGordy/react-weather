import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getWeatherData } from '../actions/action';

class WeatherDisplay extends Component {
  constructor(props) {
    super(props)
    this.state = {
      weatherData: []
    }
  }

  componentDidMount() {
    this.props.getWeatherData()
  }

  render() {
    console.log(this.props.weatherData);
    return(
      <div className='WeatherDisplay'>
        <h3>Weather Display for {this.props.zip}</h3>
      </div>
    )
  }
};

const mapStateToProps = (state) => {
  return {
    weatherData: state.weatherData
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getWeatherData: () => dispatch(getWeatherData())
    }
}

export default connect(mapStateToProps,  mapDispatchToProps)(WeatherDisplay);
