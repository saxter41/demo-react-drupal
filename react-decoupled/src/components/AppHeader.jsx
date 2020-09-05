import React from "react";
import logo2 from '../assets/images/logo_2.svg';
import '../assets/css/AppHeader.css';

const AppHeader = () => {
  return (
    <header className="App-header">
        <h1 className="App-title">
          React
        </h1>
        <a href="/">
          <img src={logo2} className="App-logo" alt="logo" />
          </a>
        <h1 className="App-title">
          Drupal
        </h1>
      </header>
  );
};

export default AppHeader;
