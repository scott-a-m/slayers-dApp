import React, { useState, useEffect } from "react";
import PlayNavbar from "../components/PlayNavbar/PlayNavbar";
import SelectCharacter from "../components/SelectCharacter/SelectCharacter";
import Arena from "../components/Arena/Arena";
import abi from "../utils/Slayers.json";
import { CONTRACT_ADDRESS, transformCharacterData } from "../constants";
import { ethers } from "ethers";
import "../Play.css";

const Play = () => {
  const slayersABI = abi.abi;

  // state variables

  const [currentAccount, setCurrentAccount] = useState(null);
  const [characterNFT, setCharacterNFT] = useState(null);
  const [errorMsg, setErrMsg] = useState("");
  const [checked, setChecked] = useState(false);
  const [status, changeStatus] = useState("danger");
  const [contract, setContract] = useState(null);

  const [audio1, setAudio1] = useState(
    () =>
      new Audio(
        "https://scott-a-m.github.io/hosted-assets/POL-the-hordes-advance-short.wav"
      )
  );
  const [audio2, setAudio2] = useState(
    () =>
      new Audio(
        "https://scott-a-m.github.io/hosted-assets/POL-mission-cobra-short.wav"
      )
  );

  const notice = () => {
    if (status === "success") {
      changeStatus("danger");
    } else {
      changeStatus("success");
    }
    setChecked((old) => !old);
  };

  // function to save slayers game contract in state if present

  const checkContract = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const gameContract = new ethers.Contract(
          CONTRACT_ADDRESS,
          slayersABI,
          signer
        );
        setContract(gameContract);
      }
    } catch (error) {
      return delayedMsg("An error occured please try again", 3000);
    }
  };

  // function to add delay for error messages disappearing

  const delayedMsg = (msg, time) => {
    setErrMsg(msg);
    setTimeout(() => {
      setErrMsg("");
    }, time);
  };

  // function for checking whether user is connected to correct blockchain

  const checkChain = async (chainName) => {
    const chains = {
      Rinkeby: "0x4",
      Ropsten: "0x3",
    };

    let chainId = await ethereum.request({ method: "eth_chainId" });

    const appChainId = chains[chainName];

    if (chainId !== appChainId) {
      delayedMsg(
        `Please make sure your wallet is connected to the ${chainName} Test Network`,
        2000
      );
      return false;
    }
    return true;
  };

  // wallet connection checker

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) return delayedMsg("please install metamask", 3000);

      const chain = await checkChain("Rinkeby");
      if (!chain) return;

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        setCurrentAccount(account);
      } else {
        return delayedMsg("please connect wallet to start slaying", 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) return alert("Please install Metamask.");

      if (!checked)
        return delayedMsg("Please first acknowledge the notice below", 3000);

      const chain = await checkChain("Rinkeby");
      if (!chain) return;

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
    } catch (error) {
      return delayedMsg("An error occured please try again", 3000);
    }
  };

  const fetchNFTMetadata = async () => {
    const txn = await contract.checkIfUserHasNFT();

    if (txn.name) {
      setCharacterNFT(transformCharacterData(txn));
    }
    return;
  };

  useEffect(() => {
    checkIfWalletIsConnected();
    audio1.play();
    audio1.loop = true;
  }, []);

  useEffect(() => {
    if (currentAccount) {
      checkContract();
    }
  }, [currentAccount]);

  useEffect(() => {
    if (contract) {
      fetchNFTMetadata();
    }
  }, [contract]);

  const renderContent = () => {
    if (!currentAccount) {
      return (
        <div>
          <div className="header-container">
            <p id="main-heading">Slayers</p>
            <p id="sub-heading">Team up to slay the desolator</p>
          </div>
          <div id="desolator-container">
            <img
              id="desolator"
              src="https://scott-a-m.github.io/slayers/slayers-desolator.png"
            />
          </div>
          <div className="btn-container">
            <p id="error" className="error">
              {errorMsg}
            </p>
            <button
              id="connect-button"
              type="button"
              className="btn btn-warning   slay-button"
              onClick={connectWallet}
            >
              CONNECT WALLET TO BEGIN
            </button>
          </div>
          <div id="cont">
            <div id="notice">
              <p id="notice-text">
                Slayers lives on Ethereum's Rinkeby Test Network.{" "}
                <strong>Never</strong> send real Eth to your testnet address. If
                you did, you would lose it.{" "}
                <a
                  href="https://medium.com/compound-finance/the-beginners-guide-to-using-an-ethereum-test-network-95bbbc85fc1d"
                  target="_blank"
                >
                  Testnets
                </a>{" "}
                use test Eth which you can get for free from{" "}
                <a href="https://faucets.chain.link/rinkeby" target="_blank">
                  Chainlink
                </a>{" "}
                or other faucets. It is recommended that you create a separate
                wallet for use on test networks.
              </p>
              <div id="checkbox-block">
                <button
                  type="button"
                  className={`btn btn-${status}`}
                  onClick={notice}
                >
                  Acknowledge
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (currentAccount && !characterNFT) {
      audio1.pause();
      audio2.play();
      audio2.loop = true;

      return (
        <SelectCharacter
          characterNFT={characterNFT}
          setCharacterNFT={setCharacterNFT}
          errorMsg={errorMsg}
          delayedMsg={delayedMsg}
          checkChain={checkChain}
          contract={contract}
        />
      );
    } else if (currentAccount && characterNFT) {
      audio2.pause();

      return (
        <Arena
          characterNFT={characterNFT}
          setCharacterNFT={setCharacterNFT}
          errorMsg={errorMsg}
          delayedMsg={delayedMsg}
          checkChain={checkChain}
          contract={contract}
          currentAccount={currentAccount}
        />
      );
    }
  };

  return (
    <div className="App">
      <div className="container-fluid">
        <PlayNavbar />
        {renderContent()}
        <div className="character-container"></div>
      </div>
    </div>
  );
};

export default Play;
