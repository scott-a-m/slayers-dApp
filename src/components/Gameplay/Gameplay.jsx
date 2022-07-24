import React, { useState, useEffect } from "react";
import "./Gameplay.css";
import { Link } from "react-router-dom";

const Gameplay = () => {
  return (
    <div id="gameplay-info">
      <h1 className="heading">Gameplay</h1>
      <div className="row Gameplay">
        <div className="col-lg-6">
          <p>
            Every time you attack the desolator you inflict standard attack
            damage on him. If you're lucky it will be a Super Attack (triple
            damage), or very lucky, a Mega Attack (5x damage).
          </p>
          <p>
            Conversely, after each attack the desolator inflicts a 50HP attack
            on your character. This might not sound like a lot, but he's called
            the desolator because of his mega HP of 20000.
          </p>
          <p>
            The goal is to inflict as much damage on him as possible. You cannot
            do this alone! Your character will end up losing all its HP and thus
            you and your friends will have to work together to SLAY him!
          </p>
          <p>Finally, good luck and let's save the metaverse!</p>
          <div className="btn-container">
            <Link to="/play" target="_blank">
              <button type="button" className="btn btn-warning   slay-button">
                START SLAYING
              </button>
            </Link>
            <br />
            <br />
          </div>
        </div>
        <div className="col-lg-6 gameplay-img">
          <img
            id="gameplay"
            src="https://scott-a-m.github.io/slayers/slayers_app_gameplay.png"
            alt="photo of gameplay"
          />
        </div>
      </div>
    </div>
  );
};

export default Gameplay;
