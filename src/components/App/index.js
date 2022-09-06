// modules
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// actions
import { loadData, setGameState, resetGame } from 'src/actions/game';
import gameModes from 'src/data/gameModes';

// components
import PlayerList from 'src/components/PlayerList';
import AddPlayer from 'src/components/AddPlayer';
import GameModes from 'src/components/GameModes';
import NavButtonPrevious from 'src/components/NavButtonPrevious';
import NavButtonNext from 'src/components/NavButtonNext';
import RoundButton from 'src/components/RoundButton';
import BombSettingButton from 'src/components/BombSettingButton';
import Rules from 'src/components/Rules';
import Bomb from 'src/components/Bomb';

// design
import bombLogo from 'src/assets/img/game-logo.svg';
import cogIcon from 'src/assets/img/cog-icon.svg';
import './styles.scss';
import select from 'src/assets/media/select3.mp3';

const audioSelect = new Audio(select);
audioSelect.loop = false;

function App() {
  const dispatch = useDispatch();
  const gameState = useSelector((state) => (state.game.state));
  const gameStateMotion = {
    initial: { x: 100, opacity: 1, scale: 1 },
    animate: { x: 0, opacity: 1, scale: 1 },
    transition: { type: 'spring' },
  };

  const playerList = useSelector((state) => (state.game.players));
  // random from array
  const randFromArray = (array) => {
    const arrayLength = array.length;
    const randomIndex = Math.floor(Math.random() * arrayLength);
    return array[randomIndex];
  };

  // on component load
  useEffect(() => {
    dispatch(loadData(gameModes));
  }, []);

  // on gameState change
  useEffect(() => {
    if (gameState === 2) {
      dispatch(resetGame());
    }
  }, [gameState]);

  const handlePlay = () => {
    dispatch(setGameState(4));
  };

  const handleSoundPlay = (sound) => {
    sound.currentTime = 0.0;
    sound.play();
  };

  const scores = useSelector((state) => (state.game.scores));
  const endGameRanking = () => {
    // count explosion by player
    const ranking = [];
    const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);
    playerList.forEach((player) => {
      ranking.push([player, countOccurrences(scores, player)]);
    });

    // sort & return the result
    return ranking.sort((a, b) => (a)[1] - (b)[1]);
  };

  // settings
  const [settingPannel, setSettingPannel] = useState(false);
  const rounds = useSelector((state) => (state.game.rounds));
  const bombMinTime = useSelector((state) => (state.game.bombMinTime));
  const bombMaxTime = useSelector((state) => (state.game.bombMaxTime));

  return (
    <div className="app">

      {/* Home */}
      { gameState === 1 && (
        <motion.div
          className="home step step-1"
          initial={gameStateMotion.initial}
          animate={gameStateMotion.animate}
          transition={gameStateMotion.transition}
        >
          <button
            type="button"
            className={settingPannel ? 'settings-btn open' : 'settings-btn'}
            onClick={() => setSettingPannel(true)}
          >
            <img src={cogIcon} alt="Settings" />
          </button>
          <motion.img
            className="game-logo"
            src={bombLogo}
            alt="Game Logo"
            initial={{ x: -100, opacity: 1, scale: 0 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            transition={{ type: 'spring' }}
          />
          <PlayerList />
          <AddPlayer />
        </motion.div>
      )}

      {/* Game Mode */}
      { gameState === 2 && (
        <motion.div
          className="mode step step-2"
          initial={gameStateMotion.initial}
          animate={gameStateMotion.animate}
          transition={gameStateMotion.transition}
        >
          <div className="navigation-buttons">
            <NavButtonPrevious newState={1} />
            <NavButtonNext newState={3} />
          </div>
          <h1 className="game-title">Nombre de manches</h1>

          <div className="rounds" onClick={() => handleSoundPlay(audioSelect)}>
            <RoundButton roundCurrent={rounds} rounds={3} />
            <RoundButton roundCurrent={rounds} rounds={6} />
            <RoundButton roundCurrent={rounds} rounds={9} />
            <RoundButton roundCurrent={rounds} rounds={12} />
            <RoundButton roundCurrent={rounds} rounds={15} />
          </div>
          <h1 className="game-title">Mode de jeu</h1>
          <GameModes />
        </motion.div>
      )}

      {/* Random first Player */}
      { gameState === 3 && (
        <motion.div
          className="first-player step step-3"
          initial={gameStateMotion.initial}
          animate={gameStateMotion.animate}
          transition={gameStateMotion.transition}
        >
          <div className="navigation-buttons">
            <NavButtonPrevious newState={2} />
          </div>
          <h1 className="game-title">Tirage du premier joueur</h1>
          <p className="categorie-title">
            <span className="first-player-name">
              { randFromArray(playerList) }
            </span> commence
          </p>
          <button
            type="button"
            className="play-btn"
            onClick={() => handlePlay()}
          >
            JOUER !
          </button>
          <Rules />
        </motion.div>
      )}

      {/* Run Game */}
      { gameState === 4 && (
        <motion.div
          className="game step step-4"
          initial={gameStateMotion.initial}
          animate={gameStateMotion.animate}
          transition={gameStateMotion.transition}
        >
          <div className="navigation-buttons">
            {/* <NavButtonPrevious newState={2} /> */}
          </div>
          <h1 className="game-title">JEU !</h1>
          <Bomb />
        </motion.div>
      )}

      {/* End Game */}
      { gameState === 5 && (
      <motion.div
        className="game step step-5"
        initial={gameStateMotion.initial}
        animate={gameStateMotion.animate}
        transition={gameStateMotion.transition}
      >
        <div className="navigation-buttons">
          <NavButtonPrevious newState={2} />
        </div>
        <h1 className="game-title">Fin de la partie</h1>
        <div className="score-board">
          <p className="categorie-title">Classement :</p>
          {endGameRanking().map(([player, score], i) => (
            <p
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              className={i === 0 ? 'player winner' : 'player'}
            >
              <span className="player-name">{player}</span>
              <span className="player-score">{score}</span>
            </p>
          ))}
        </div>

      </motion.div>
      )}

      {/* Settings Pannel */}
      <div className={settingPannel ? 'settings open' : 'settings'}>
        <button
          className="close-settings-btn"
          type="button"
          onClick={() => setSettingPannel(false)}
        >
          ✖
        </button>
        <h1 className="game-title">Parametres</h1>
        <p className="categorie-title">Timer de la bombe (en secondes)</p>
        <p className="option-group" onClick={() => handleSoundPlay(audioSelect)}>
          <span>Min :</span>
          <BombSettingButton
            bombSetting="bombMinTime"
            currentValue={bombMinTime}
            value={10}
            text="10"
          />
          <BombSettingButton
            bombSetting="bombMinTime"
            currentValue={bombMinTime}
            value={20}
            text="20"
          />
          <BombSettingButton
            bombSetting="bombMinTime"
            currentValue={bombMinTime}
            value={30}
            text="30"
          />
        </p>
        <p className="option-group" onClick={() => handleSoundPlay(audioSelect)}>
          <span>Max :</span>
          <BombSettingButton
            bombSetting="bombMaxTime"
            currentValue={bombMaxTime}
            value={50}
            text="50"
          />
          <BombSettingButton
            bombSetting="bombMaxTime"
            currentValue={bombMaxTime}
            value={70}
            text="70"
          />
          <BombSettingButton
            bombSetting="bombMaxTime"
            currentValue={bombMaxTime}
            value={90}
            text="90"
          />
        </p>
        <div className="credit-zone">
          <p className="categorie-title">Informations & crédits</p>
          <p className="info-credit">
            Application réalisée par <strong>Kinoah.com</strong><br />
            TechStack : JS, React.<br />
            Illustration d'accueil basée sur celle de <strong><a href="https://fr.freepik.com/vecteurs-libre/bulle-dialogue-comique-texte-boom_13578063.htm#query=bomb&position=1&from_view=search" target="_blank" rel="noreferrer">brgfx</a> sur Freepik</strong>
          </p>
        </div>
      </div>

    </div>
  );
}

export default App;
