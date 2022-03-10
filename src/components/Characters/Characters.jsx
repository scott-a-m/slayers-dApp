import React, { useState, useEffect } from "react";
import "./Characters.css";

const Characters = () => {
  const characters = [
    {
      name: "Ninja",
      imageURI:
        "https://scott-a-m.github.io/slayers/slayers-ninja.png",
      maxHp: 400,
      attackDamage: 200,
    },
    {
      name: "Swordsman",
      imageURI:
        "https://scott-a-m.github.io/slayers/slayers-swordsman.png",
      maxHp: 500,
      attackDamage: 170,
    },
    {
      name: "Blade",
      imageURI:
        "https://scott-a-m.github.io/slayers/slayers-blade.png",
      maxHp: 450,
      attackDamage: 190,
    },
    {
      name: "Quicksilver",
      imageURI:
        "https://scott-a-m.github.io/slayers/slayers-quicksilver.png",
      maxHp: 500,
      attackDamage: 150,
    },
    {
      name: "Slayer",
      imageURI:
        "https://scott-a-m.github.io/slayers/slayers-slayer.png",
      maxHp: 450,
      attackDamage: 180,
    },
    {
      name: "Mystique",
      imageURI:
        "https://scott-a-m.github.io/slayers/slayers-mystique.png",
      maxHp: 550,
      attackDamage: 150,
    },
    {
      name: "Slash",
      imageURI:
        "https://scott-a-m.github.io/slayers/slayers-slash.png",
      maxHp: 500,
      attackDamage: 175,
    },
  ];

  const renderCharacters = () =>
    characters.map((character, index) => {
      if (character === characters[0]) {
        return (
          <div className="carousel-item active" key={character.name}>
            <div className="character-item">
              <div className="name-container">
                <p className="names">{character.name}</p>
              </div>
              <figure className="img-container">
                <img
                  className="character-image"
                  src={character.imageURI}
                  alt={character.name}
                />
              </figure>
              <div className="stat-box">
                <p>
                  <strong>HP:</strong> {character.maxHp}
                  <br />
                  <strong>Damage:</strong> {character.attackDamage}
                </p>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div className="carousel-item" key={character.name}>
            <div className="character-item">
              <div className="name-container">
                <p className="names">{character.name}</p>
              </div>
              <figure className="img-container">
                <img
                  className="character-image"
                  src={character.imageURI}
                  alt={character.name}
                />
              </figure>
              <div className="stat-box">
                <p>
                  <strong>HP:</strong> {character.maxHp}
                  <br />
                  <strong>Damage:</strong> {character.attackDamage}
                </p>
              </div>
            </div>
          </div>
        );
      }
    });

  return (
    <div id="characters-info">
      <div>
        <p className="heading">Characters</p>
      </div>
      <div
        id="carouselExampleControls"
        className="carousel slide characters"
        data-bs-interval="false"
      >
        <div className="carousel-inner">{renderCharacters()}</div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default Characters;
