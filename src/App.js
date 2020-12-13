import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import "./App.css"
import { Navbar } from "./Components/Navbar/Navbar"
import Filter from "./Components/Filter/Filter"
import Content from "./Components/Content/Content"

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Navbar />
        <div className="container">
          <div className="row">
            <div className="col s3">
              <Filter />
            </div>
            <div className="col s8 offset-s1">
              <Content />
            </div>
          </div>
        </div>
      </div>
    </Provider>
  );
}

export default App;
