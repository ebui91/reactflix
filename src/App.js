import React, { Component } from "react";
import Router from "./router.js";
import "./App.css";


class App extends Component {
  render() {
    return (
      <div className="App">
        <nav>
          <h1 id="reactflix">REACTFLIX</h1>
        </nav>
        
        { Router }

        <footer>
          <p style={{ color:"#DEDEDE" }}>FOOTER SECTION</p>
        </footer>
      </div>
    );
  }
}

export default App;
