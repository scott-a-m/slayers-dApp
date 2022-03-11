import React from "react";
import HomeNavbar from "../components/HomeNavbar/HomeNavbar";
import Info from "../components/Info/Info";
import Characters from "../components/Characters/Characters";
import Gameplay from "../components/Gameplay/Gameplay";
import Blockchain from "../components/Blockchain/Blockchain";
import "../Home.css";

const Home = () => {
  return (
    <div className="App">
      <div className="container-fluid">
        <HomeNavbar />
        <Info />
        <Characters />
        <Gameplay />
        <Blockchain />
        <div className="btn-container">
          <a href="https://slayers-play.netlify.app/" target="_blank">
            <button
              type="button"
              id="start-slaying"
              className="btn btn-warning slay-button"
            >
              START SLAYING
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
