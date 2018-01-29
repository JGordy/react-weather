import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getForecastByCityID } from '../actions/action';

class WeatherDisplay extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    // this.props.getForecastByCityID(this.props.place.id)
  }

  render() {
    console.log("PRAWPS----> ", this.props);

    return(
      <div className='WeatherDisplay'>
        <h3>Weather Display for {this.props.place.name}</h3>
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
