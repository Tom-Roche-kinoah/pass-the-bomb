// modules
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

// actions
// import { setGameState } from 'src/actions/game';

// components
import State from 'src/components/State';
import StateNavigation from 'src/components/StateNavigation';
import PlayerList from 'src/components/PlayerList';
import AddPlayer from 'src/components/AddPlayer';

// design
import bombLogo from './bomb_icon.svg';
import './styles.css';

function App() {
  // const dispatch = useDispatch();
  const gameState = useSelector((state) => (state.game.state));
  // const stepsStyle = {
  //   left: `${-(gameState * 100) + 100}vw`,
  // };
  const gameStateMotion = {
    initial: { x: 100, opacity: 1, scale: 1 },
    animate: { x: 0, opacity: 1, scale: 1 },
    transition: { type: 'tween' },
  };

  return (
    <div className="app">

      <State />
      <StateNavigation />

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
          <h1 className="game-title">Mode de jeu</h1>
        </motion.div>
      )}

      { gameState === 3 && (
        <motion.div
          className="first-player step step-3"
          initial={gameStateMotion.initial}
          animate={gameStateMotion.animate}
          transition={gameStateMotion.transition}
        >
          <h1 className="game-title">Tirage du premier joueur</h1>
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
