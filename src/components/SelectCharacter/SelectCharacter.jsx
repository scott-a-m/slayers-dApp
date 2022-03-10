import React, { useState, useEffect } from "react";
import "./SelectCharacter.css";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, transformCharacterData } from "../../constants";
import abi from "../../utils/Slayers.json";
import Loader from "../Loader/Loader";

const SelectCharacter = ({
  characterNFT,
  setCharacterNFT,
  delayedMsg,
  checkChain,
  contract,
  errorMsg,
}) => {
  const gameAbi = abi.abi;

  const [characters, setCharacters] = useState([]);
  const [mintingCharacter, setMintingCharacter] = useState("");
  const [btn, setBtn] = useState({ disabled: false, opacity: 1 });

  const getCharacters = async () => {
    try {
      const chain = await checkChain("Rinkeby");
      if (!chain) return;

      console.log("Getting contract characters to mint");
      const charactersTxn = await contract.getAllDefaultCharacters();
      console.log("charactersTxn:", charactersTxn);
      const gameCharacters = charactersTxn.map((characterData) =>
        transformCharacterData(characterData)
      );
      setCharacters(gameCharacters);
    } catch (error) {
      console.error("Something went wrong fetching characters:", error);
      return delayedMsg("Something went wrong, please try again", 2000);
    }
  };

  const onCharacterMint = async (sender, tokenId, characterIndex) => {
    console.log(
      `CharacterNFTMinted - sender: ${sender} tokenId: ${tokenId.toNumber()} characterIndex: ${characterIndex.toNumber()}`
    );

    const characterNFT = await contract.checkIfUserHasNFT();
    console.log("CharacterNFT: ", characterNFT);
    setCharacterNFT(transformCharacterData(characterNFT));
  };

  const mintCharacterNFTAction = (characterId) => async () => {
    setBtn({ disabled: true, opacity: 0.5 });

    try {
      const chain = await checkChain("Rinkeby");
      if (!chain) return;

      console.log("Minting character in progress...");
      setMintingCharacter("Minting Character");
      const mintTxn = await contract.mintCharacterNFT(characterId, {
        gasLimit: 3000000,
      });
      await mintTxn.wait();
      setMintingCharacter("Minting Complete");
      console.log("mintTxn:", mintTxn);
    } catch (error) {
      console.warn("MintCharacterAction Error:", error);
      setMintingCharacter("");
      setBtn({ disabled: false, opacity: 1 });
      if (error.code === "UNSUPPORTED_OPERATION")
        return delayedMsg("Please make sure your wallet is connected.", 2000);
      return delayedMsg("An error occured. Please try again.", 2000);
    }
  };

  useEffect(() => {
    if (!contract) return;

    getCharacters();
    contract.on("CharacterNFTMinted", onCharacterMint);
    return () => {
      contract.off("CharacterNFTMinted", onCharacterMint);
    };
  }, [contract]);

  const renderCharacters = () =>
    characters.map((character, index) => {
      if (character === characters[0]) {
        return (
          <div className="carousel-item active" key={character.name}>
            <div className="character-item">
              <div className="name-container">
                <p style={{ fontSize: "2rem" }}>{character.name}</p>
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
              {mintingCharacter && (
                <div className="minting">
                  <Loader />
                  <p style={{ color: "yellow" }}>{mintingCharacter}</p>
                </div>
              )}
              {errorMsg && <div className="error">{errorMsg}</div>}
              <button
                className="btn btn-light mint-button"
                onClick={mintCharacterNFTAction(index)}
                disabled={btn.disabled}
                style={{ opacity: btn.opacity }}
              >
                Mint
              </button>
            </div>
          </div>
        );
      } else {
        return (
          <div className="carousel-item" key={character.name}>
            <div className="character-item">
              <div className="name-container">
                <p style={{ fontSize: "2rem" }}>{character.name}</p>
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
              {mintingCharacter && (
                <div className="minting">
                  <Loader />
                  <p style={{ color: "yellow" }}>{mintingCharacter}</p>
                </div>
              )}
              {errorMsg && <div className="error">{errorMsg}</div>}
              <button
                className="btn btn-light mint-button"
                onClick={mintCharacterNFTAction(index)}
                disabled={btn.disabled}
                style={{ opacity: btn.opacity }}
              >
                Mint
              </button>
            </div>
          </div>
        );
      }
    });

  return (
    <div>
      <div>
        <p className="heading gap">Choose your character</p>
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

export default SelectCharacter;
