import React, { useEffect, useState } from "react";
import "./Arena.css";
import { transformCharacterData } from "../../constants";
import Loader from "../Loader/Loader";

const Arena = ({
  characterNFT,
  setCharacterNFT,
  delayedMsg,
  checkChain,
  contract,
  errorMsg,
  currentAccount,
}) => {
  const [attackState, setAttackState] = useState("");
  const [attackClass, setAttackClass] = useState("");
  const [attackClass2, setAttackClass2] = useState("");
  const [desolatorState, setDesolatorState] = useState("");
  const [characterState, setCharacterState] = useState("");
  const [boss, setBoss] = useState(null);
  const [btn, setBtn] = useState({ disabled: false, opacity: 1 });

  const [attackAudio, setAttackAudio] = useState(
    () =>
      new Audio(
        "https://scott-a-m.github.io/hosted-assets/POL-shape-shift-short.wav"
      )
  );

  const [victoryAudio, setVictoryAudio] = useState(
    () =>
      new Audio(
        "https://scott-a-m.github.io/hosted-assets/POL-hero-of-light-short.wav "
      )
  );

  const [defeatAudio, setDefeatAudio] = useState(
    () =>
      new Audio(
        "https://scott-a-m.github.io/hosted-assets/POL-graveyard-lord-short.wav"
      )
  );

  const [audio3, setAudio3] = useState(
    () =>
      new Audio(
        "https://scott-a-m.github.io/hosted-assets/POL-countering-evil-short.wav"
      )
  );

  const checkBossState = () => {
    if (boss.hp === 0) {
      setDesolatorState("dead-desolator");
      audio3.pause();
      victoryAudio.play();
      victoryAudio.loop = true;
    }
  };

  const checkCharacterState = () => {
    if (characterNFT.hp === 0) {
      setCharacterState("dead-character");
      audio3.pause();
      defeatAudio.play();
      defeatAudio.loop = true;
    }
  };

  const runAttackAction = async () => {
    setBtn({ disabled: true, opacity: 0.5 });

    try {
      const chain = await checkChain("Rinkeby");
      if (!chain) return;

      audio3.pause();
      attackAudio.play();
      attackAudio.loop = true;
      setAttackState("attacking");
      const attackTxn = await contract.attackBoss({ gasLimit: 3000000 });
      await attackTxn.wait();
      setAttackState("");
      attackAudio.pause();
      audio3.play();
      audio3.loop = true;
    } catch (error) {
      setAttackState("");
      attackAudio.pause();
      audio3.play();
      audio3.loop = true;
      setBtn({ disabled: false, opacity: 1 });

      if (error.code === "UNSUPPORTED_OPERATION")
        return delayedMsg("Please make sure your wallet is connected.", 2000);
      return delayedMsg("something went wrong, please try again", 2000);
    }
    setBtn({ disabled: false, opacity: 1 });
  };

  const getBoss = async () => {
    const chain = await checkChain("Rinkeby");
    if (!chain) return;

    const bossTxn = await contract.getBigBoss();
    setBoss(transformCharacterData(bossTxn));
  };

  const onAttack = (from, atkClass, atkDamage) => {
    const attackClass = atkClass.toString();
    const attackDamage = atkDamage.toNumber();
    const sender = from.toString();

    if (currentAccount === sender.toLowerCase()) {
      setAttackClass(() => {
        return (
          <div>
            <p
              style={{
                color: "yellow",
                fontSize: "1.2rem",
                marginTop: "1rem",
              }}
            >
              Boss hit for:
              <br />
              <span id="hp">{attackDamage}HP</span>
              <br />
              <br />
              {attackClass}
            </p>
          </div>
        );
      });

      setTimeout(() => {
        setAttackClass("");
      }, 3000);
    } else {
      setAttackClass2(() => {
        return (
          <div>
            <p
              style={{
                color: "limegreen",
                fontSize: "1.2rem",
                marginTop: "1rem",
              }}
            >
              Boss hit by other player for:
              <br />
              <span id="hp">{attackDamage}HP</span>
              <br />
              <br />
              {attackClass}
            </p>
          </div>
        );
      });

      setTimeout(() => {
        setAttackClass2("");
      }, 3000);
    }
  };

  const onAttackComplete = (from, newBossHp, newPlayerHp) => {
    const bossHp = newBossHp.toNumber();
    const playerHp = newPlayerHp.toNumber();
    const sender = from.toString();

    /*
     * Update both player and boss Hp
     */

    if (currentAccount === sender.toLowerCase()) {
      setBoss((prevState) => {
        return { ...prevState, hp: bossHp };
      });

      setCharacterNFT((prevState) => {
        return { ...prevState, hp: playerHp };
      });
    } else {
      // only update boss
      setBoss((prevState) => {
        return { ...prevState, hp: bossHp };
      });
    }

    if (bossHp === 0) {
      setTimeout(() => {
        setDesolatorState("dead-desolator");
        audio3.pause();
        victoryAudio.play();
        victoryAudio.loop = true;
      }, 1000);
      return;
    }

    if (playerHp === 0 && currentAccount === sender.toLowerCase()) {
      setCharacterState("dead-character");
      audio3.pause();
      defeatAudio.play();
      defeatAudio.loop = true;
      return;
    }
  };

  useEffect(() => {
    audio3.play();
    audio3.loop = true;
    getBoss();
    checkCharacterState();
    contract.on("AttackComplete", onAttackComplete);
    contract.on("AttackClass", onAttack);
  }, []);

  useEffect(() => {
    if (!boss) return;
    checkBossState();
  }, [boss]);

  const renderAttackContent = () => {
    if (desolatorState === "dead-desolator") {
      return (
        <div className="col-md-2 attack-controls">
          <div className="attack-state">
            <p id="defeated">
              S<br />L<br />A<br />Y<br />E<br />D<br />
            </p>
          </div>
        </div>
      );
    } else if (characterState === "dead-character") {
      return (
        <div className="col-md-2 attack-controls">
          <div className="attack-state">
            <p id="defeated">
              D<br />E<br />S<br />O<br />L<br />A<br />T<br />E<br />D
            </p>
          </div>
        </div>
      );
    } else {
      return (
        <div className="col-md-2 attack-controls">
          <button
            type="button"
            className="btn btn-warning attack-btn"
            onClick={runAttackAction}
            disabled={btn.disabled}
            style={{ opacity: btn.opacity }}
          >
            ATTACK
          </button>
          <div>{attackClass}</div>
          <div>{attackClass2}</div>

          {attackState && (
            <div className="attack-state">
              <Loader />
              <div>Attacking</div>
            </div>
          )}
          {errorMsg && <div className="error">{errorMsg}</div>}
        </div>
      );
    }
  };

  return (
    <div className="row justify-content-center arena-container">
      <div className="heading gap">FIGHT</div>

      {/* Replace your Character UI with this */}
      {characterNFT && (
        <div className="col-md-5 players-container">
          <div className="image-content player-box">
            <h2 className="name">{characterNFT.name}</h2>
            <img
              src={characterNFT.imageURI}
              alt={`Character ${characterNFT.name}`}
              className={`your-character ${attackState} ${characterState}`}
            />
            <div className="health-bar">
              <progress value={characterNFT.hp} max={characterNFT.maxHp} />
              <p className="info">{`${characterNFT.hp} / ${characterNFT.maxHp} HP`}</p>
            </div>

            <div className="stats">
              <p className="info">
                <strong>Attack Damage: </strong>
                {characterNFT.attackDamage}
              </p>
            </div>
          </div>
        </div>
      )}

      {renderAttackContent()}

      {/* Boss */}
      {boss && (
        <div className="col-md-5 boss-container">
          <h2 className="name">{boss.name}</h2>
          <div className="image-content">
            <img
              src={boss.imageURI}
              alt={`Boss ${boss.name}`}
              className={`desolator ${attackState} ${desolatorState}`}
            />
            <div className="health-bar">
              <progress value={boss.hp} max={boss.maxHp} />
              <p className="info">{`${boss.hp} / ${boss.maxHp} HP`}</p>
            </div>
          </div>
          <div className="attack-container"></div>
        </div>
      )}
    </div>
  );
};

export default Arena;
