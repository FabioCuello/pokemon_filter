import React, { useEffect } from "react";
import M from "materialize-css";
import Navbar from "./Components/Navbar/Navbar";
import Filter from "./Components/Filter/Filter";
import Content from "./Components/Content/Content";
import PokemonModal from "./Components/ModalContent/ModalContent";
import "./App.css";

function App() {
  useEffect(() => {
    const element = document.querySelectorAll(`.modal`);
    M.Modal.init(element.current);
  }, []);

  return (
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
          <PokemonModal />
        </div>
      </div>
    </div>
  );
}

export default App;
