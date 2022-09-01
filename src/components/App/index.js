// modules
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { motion } from 'framer-motion';

// actions
import { loadData, setGameState } from 'src/actions/game';
import gameModes from 'src/data/gameModes';

// components
import PlayerList from 'src/components/PlayerList';
import AddPlayer from 'src/components/AddPlayer';
import GameModes from 'src/components/GameModes';
import NavButtonPrevious from 'src/components/NavButtonPrevious';
import NavButtonNext from 'src/components/NavButtonNext';
import RoundButton from 'src/components/RoundButton';

// design
import bombLogo from './bomb_icon.svg';
import './styles.scss';
import ticTac from '../../assets/media/tic-tac.mp3';

const audioTicTac = new Audio(ticTac);
audioTicTac.loop = true;

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

  const rounds = useSelector((state) => (state.game.rounds));

  // on component load
  useEffect(() => {
    dispatch(loadData(gameModes));
  }, []);

  // on gameState change
  useEffect(() => {
    if (gameState === 4) {
      audioTicTac.play();
      audioTicTac.loop = true;
    }
    else {
      audioTicTac.pause();
      audioTicTac.currentTime = 0.0;
    }
  }, [gameState]);

  return (
    <div className="app">

      { gameState === 1 && (
        <motion.div
          className="home step step-1"
          initial={gameStateMotion.initial}
          animate={gameStateMotion.animate}
          transition={gameStateMotion.transition}
        >
          <img className="game-logo" src={bombLogo} alt="Game Logo" />
          <h1 className="game-title">Pass the bomb !</h1>
          <PlayerList />
          <AddPlayer />
        </motion.div>
      )}

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

          <div className="rounds">
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
          <p>{ randFromArray(playerList) } commence</p>
          <button
            type="button"
            className="play-btn"
            onClick={() => dispatch(setGameState(4))}
          >
            JOUER !
          </button>
        </motion.div>
      )}

      { gameState === 4 && (
        <motion.div
          className="game step step-4"
          initial={gameStateMotion.initial}
          animate={gameStateMotion.animate}
          transition={gameStateMotion.transition}
        >
          <div className="navigation-buttons">
            <NavButtonPrevious newState={3} />
          </div>
          <h1 className="game-title">JEU !</h1>
          <img className="game-logo" src={bombLogo} alt="Game Logo" />
        </motion.div>
      )}

    </div>
  );
}

export default App;
