import logo from './logo.svg';
import './App.css';
import {BrowserRouter} from "react-router-dom";
import React from "react";
import {AppNavigation} from "./app/navigations/AppNavigation";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/js/all.js';


function App() {
  return (
    <BrowserRouter>
      <AppNavigation/>
    </BrowserRouter>
  );
}

export default App;
