import { SET_DATA, SET_CITY } from '../actions/action';
import update from 'immutability-helper';

const initialState = {
  weatherData: null,
  cityForecast: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DATA:
            return update(state, {
              weatherData: {
                $set: action.payload
              }
            });
        case SET_CITY:
            return update(state, {
              cityForecast: {
                $set: action.payload
              }
            });
        default:
          return state;
    }
};

export default reducer;
