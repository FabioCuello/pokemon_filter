import React from 'react';
import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Home } from './pages';
import {
  contentReducer,
  filtersReducer,
  modalReducer
} from './store/reducers/index';

const rootReducer = combineReducers({
  content: contentReducer,
  filters: filtersReducer,
  modal: modalReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

const Router = () => (
  <BrowserRouter>
    <Provider store={store}>
      <Switch>
        <Route path="/" exact component={Home} />
      </Switch>
    </Provider>
  </BrowserRouter>
);

export default Router;
