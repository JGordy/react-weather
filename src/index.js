import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import CityNav from './containers/CityNav/CityNav';
import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducer/reducer';

const store = createStore(
    reducers,
    compose(
        applyMiddleware(reduxThunk)
    )
);


ReactDOM.render(
<Provider store={store}>
  <CityNav />
</Provider>, document.getElementById('root'));
registerServiceWorker();
