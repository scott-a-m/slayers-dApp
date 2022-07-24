import React from "react";
import HomeNavbar from "../components/HomeNavbar/HomeNavbar";
import Info from "../components/Info/Info";
import Characters from "../components/Characters/Characters";
import Gameplay from "../components/Gameplay/Gameplay";
import Blockchain from "../components/Blockchain/Blockchain";
import "../Home.css";
import { Link } from "react-router-dom";

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
          <Link to="/play" target="_blank">
            <button
              type="button"
              id="start-slaying"
              className="btn btn-warning slay-button"
            >
              START SLAYING
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
