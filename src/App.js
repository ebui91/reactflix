import React, { Component } from "react";
import Router from "./router.js";


class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>WHAT SHOULD I WATCH</h1>
        <hr />
        { Router }
      </div>
    );
  }
}

export default App;
