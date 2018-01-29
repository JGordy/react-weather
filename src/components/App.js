import React, { Component } from 'react';
import '../styles/App.css';
import PLACES from '../constants/places';
import WeatherDisplay from '../containers/WeatherDisplay';


class App extends Component {
  constructor() {
    super()
    this.state = {
      activePlace: 0
    }
  }


  render() {
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

export default App;
