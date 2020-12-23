import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import {
  contentReducer,
  filtersReducer,
  modalReducer,
} from "./store/reducers/index.js";

const rootReducer = combineReducers({
  content: contentReducer,
  filters: filtersReducer,
  modal: modalReducer,
});
const store = createStore(rootReducer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
