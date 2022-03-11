import React, { useState, useEffect } from "react";
import "./Blockchain.css";
import freecodecampLogo from "../../assets/img/free-code-camp-logo.svg";
import twitterLogo from "../../assets/img/icons8-twitter.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFreeCodeCamp,
  faGithub,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const Blockchain = () => {
  const twrLogo = twitterLogo;
  const fccLogo = freecodecampLogo;

  return (
    <div className="row general-info">
      <div className="col-lg-7">
        <h1 className="heading" id="blockchain">
          Blockchain
        </h1>
        <p>
          Slayers lives on Ethereum's Rinkeby Test Network. This means that all
          transactions are processed using Test Eth which won't cost you a
          thing. You can get some here from{" "}
          <a href="https://faucets.chain.link/rinkeby" target="_blank">
            Chainlink
          </a>
          . It it recommended that you create a new metamask wallet specifically
          for use on test networks. Also, <strong>never</strong> send real Eth
          to your testnet address. One you dont need to because you can claim
          Rinkeby test Eth for free, and more importantly, two because if you
          did you would not be able to recover it. To find out more about test
          networks, click{" "}
          <a
            href="https://medium.com/compound-finance/the-beginners-guide-to-using-an-ethereum-test-network-95bbbc85fc1d"
            target="_blank"
          >
            here
          </a>
          .
        </p>
        <p>
          Each <a href="#characters-info">character</a> is an NFT, which means
          once you mint one - it's in your wallet and yours for life! Only one
          character can be minted per wallet address. Each time you attack the
          desolator, the transaction will be recorded on the blockchain and your
          character's HP metadata will be updated, which you'll be able to view
          on{" "}
          <a
            href="https://testnets.opensea.io/collection/slayers-5jifuig6uf"
            target="_blank"
          >
            Opensea
          </a>
          .
        </p>
      </div>
      <div className="col-lg-5">
        <h1 className="heading" id="contact">
          Contact
        </h1>
        <div id="contact-block" style={{ textAlign: "center" }}>
          <p id="designer">developed by Scott Mitchell</p>
          <a
            href="https://github.com/scott-a-m"
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon
              icon={faGithub}
              size="2x"
              border
              className="contact-icon"
            />
          </a>
          <a
            href="https://twitter.com/_scott_a_m"
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon
              icon={faTwitter}
              size="2x"
              border
              className="contact-icon"
            />
          </a>
          <a
            href="https://www.freecodecamp.org/scott-a-m"
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon
              icon={faFreeCodeCamp}
              size="2x"
              border
              className="contact-icon"
            />
          </a>
          <a href="mailto:scott_a_mitchell@163.com">
            <FontAwesomeIcon
              icon={faEnvelope}
              size="2x"
              border
              className="contact-icon"
            />
          </a>
        </div>
        <div
          id="buildspace"
          style={{ marginBottom: "2rem", marginTop: "1rem" }}
        >
          <a href="buildspace.so/" target="_blank">
            with Buildspace
          </a>
        </div>
        <div>
          <p className="credits-block">
            Game music from{" "}
            <a href="https://www.playonloop.com" target="_blank">
              PlayOnLoop.com
            </a>
            . Character illustrations from{" "}
            <a
              href="https://pixabay.com/illustrations/woman-warrior-beauty-determined-1959982/"
              target="_blank"
            >
              SilviaP_Design
            </a>
            ,{" "}
            <a
              href="https://pixabay.com/illustrations/warrior-woman-gothic-dark-sexy-3169505/"
              target="_blank"
            >
              700622
            </a>
            ,{" "}
            <a
              href="https://pixabay.com/illustrations/warrior-woman-gothic-dark-2849393/"
              target="_blank"
            >
              Majabel_Creaciones[1]
            </a>
            <a
              href="https://pixabay.com/illustrations/fantasy-amazon-warrior-heroin-3965761/"
              target="_blank"
            >
              [2]
            </a>
            ,{" "}
            <a
              href="https://pixabay.com/illustrations/viking-warrior-male-muscular-2009503/"
              target="_blank"
            >
              darksouls1
            </a>
            ,{" "}
            <a
              href="https://pixabay.com/illustrations/female-warrior-3d-fantasy-pose-4354082/"
              target="_blank"
            >
              pendleburyannette[1]
            </a>
            <a
              href="https://pixabay.com/illustrations/warrior-render-character-3d-render-6504827/"
              target="_blank"
            >
              [2]
            </a>
            <a
              href="https://pixabay.com/illustrations/man-warrior-fantasy-sword-male-5636468/"
              target="_blank"
            >
              [3]
            </a>{" "}
            at{" "}
            <a href="https://pixabay.com/" target="_blank">
              Pixabay
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default Blockchain;
