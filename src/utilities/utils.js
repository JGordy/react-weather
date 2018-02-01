import React from 'react';
import * as Typeicons from 'react-icons/lib/ti';

const utils = {
  getCityIds: (cities) => {
    let cityIdList = [];
    cities.forEach(index => {
      cityIdList.push(index.id);
    });
    return cityIdList.join(',');
  },
  handleWeatherIcon: (weather) => {
    switch (weather) {
      case 'Clear':
        return <Typeicons.TiWeatherSunny />;
      case 'Snow':
        return <Typeicons.TiWeatherSnow />;
      case 'Haze' || 'Fog':
        return <Typeicons.TiWaves />;
      case 'Rain' || 'Drizzle':
        return <Typeicons.TiWeatherShower />;
      case 'Clouds':
        return <Typeicons.TiWeatherCloudy />;
      default:
        return <Typeicons.TiWeatherPartlySunny />;
    }
  },
  handleTempColor: (temp) => {
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
  },
  convertStringToHour: (string) => {
    let splitString = Number(string.split(' ')[1].split(':')[0]);

    if (splitString === 0) {
      return "12AM";
    } else if (splitString > 12 ) {
      return `${splitString - 12}PM`;
    } else if (splitString === 12) {
      return splitString + "PM"
    } else {
      return splitString + "AM";
    }
  },
  getDay: (date) => {
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let d = new Date(date);
    return days[d.getDay()];
  },
  scrollTo: (element) => {
    window.scroll({
      behavior: 'smooth',
      left: 0,
      top: document.getElementById(element).offsetTop
    });
  }
};

export default utils;
