import React from "react";
import "./Info.css";
import { Link } from "react-router-dom";

const Info = () => {
  return (
    <div className="row general-info" id="home">
      <div className="col-lg-6">
        <h1 className="heading">Welcome to Slayers</h1>
        <p>
          Slayers is a <a href="#blockchain">free</a> turn-based{" "}
          <a href="#blockchain">NFT</a> mini-game where the goal is to defeat
          the evil Desolator who is threatening the metaverse.
        </p>
        <p>
          There are seven <a href="#characters-info">characters</a> to choose
          from, <a href="#blockchain">mint</a> and bring to battle.
        </p>
        <p>
          The desolator has a mega HP of 20000. It is impossible to defeat him
          alone. Thus the more players who participate the higher the chance of
          defeating him.
        </p>
        <p>Now let's go protect the metaverse!</p>
        <div className="btn-container">
          <Link to="/play" target="_blank">
            <button type="button" className="btn btn-warning slay-button">
              START SLAYING
            </button>
          </Link>
        </div>
      </div>
      <div className="col-lg-6">
        <div id="desolator-container">
          <img
            id="desolator"
            src="https://scott-a-m.github.io/slayers/slayers-desolator.png"
          />
        </div>
      </div>
    </div>
  );
};

export default Info;
