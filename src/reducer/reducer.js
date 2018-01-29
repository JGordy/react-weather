import { SET_DATA } from '../actions/action';
import update from 'immutability-helper';

const initialState = {
  weatherData: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DATA:
            return update(state, {
              weatherData: {
                $set: action.payload
              }
            });

        default:
          return state;
    }
}

export default reducer;
