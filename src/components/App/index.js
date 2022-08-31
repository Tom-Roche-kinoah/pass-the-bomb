// modules
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { motion } from 'framer-motion';

// actions
import { loadData, setRounds } from 'src/actions/game';
import gameModes from 'src/data/gameModes';

// components
import PlayerList from 'src/components/PlayerList';
import AddPlayer from 'src/components/AddPlayer';
import GameModes from 'src/components/GameModes';
import NavButtonPrevious from 'src/components/NavButtonPrevious';
import NavButtonNext from 'src/components/NavButtonNext';

// design
import bombLogo from './bomb_icon.svg';
import './styles.scss';

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

  // function randomFirstAnim() {
  //   setTimeout(() => {
  //     alert(randFromArray(playerList));
  //   }, 1000);
  // }

  // on component load
  useEffect(() => {
    dispatch(loadData(gameModes));
  }, []);

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
            <button type="button" className={rounds === 6 ? 'round-btn active' : 'round-btn'} onClick={() => dispatch(setRounds(6))}>06</button>
            <button type="button" className={rounds === 9 ? 'round-btn active' : 'round-btn'} onClick={() => dispatch(setRounds(9))}>09</button>
            <button type="button" className={rounds === 12 ? 'round-btn active' : 'round-btn'} onClick={() => dispatch(setRounds(12))}>12</button>
            <button type="button" className={rounds === 15 ? 'round-btn active' : 'round-btn'} onClick={() => dispatch(setRounds(15))}>15</button>
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
          <p>{ randFromArray(playerList) }</p>
        </motion.div>
      )}

      { gameState === 4 && (
        <motion.div
          className="game step step-4"
          initial={gameStateMotion.initial}
          animate={gameStateMotion.animate}
          transition={gameStateMotion.transition}
        >
          <h1 className="game-title">JEU !</h1>
        </motion.div>
      )}

    </div>
  );
}

export default App;
