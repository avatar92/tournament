import React from "react";
import NavBar from "./component/layout/NavBar";
import Footer from "./component/layout/Footer";
import HomePage from "./component/homepage/HomePage";
import { Provider } from "react-redux";

import "./App.css";
import store from "./store";

// console.log(store.getState());

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <NavBar />
        <HomePage />
        <Footer />
      </div>
    </Provider>
  );
}

export default App;
