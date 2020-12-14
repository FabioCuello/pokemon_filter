import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import "./App.css"
import Navbar from "./Components/Navbar/Navbar"
import Filter from "./Components/Filter/Filter"
import Content from "./Components/Content/Content"

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Navbar />
        <div className="container">
          <div className="row">
            <div className="col xl3 l3 m12 s12">
              <Filter />
            </div>
            <div className="col s12 m12 xl8 l8 offset-l1 offset-xl1">
              <Content />
            </div>
          </div>
        </div>
      </div>
    </Provider>
  );
}

export default App;
