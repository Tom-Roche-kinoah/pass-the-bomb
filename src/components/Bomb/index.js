// modules
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

// actions
import { } from 'src/actions/game';

// components

// design
import bombLogo from '../App/bomb_icon.svg';
import './styles.scss';

function Bomb() {
  const gameModes = useSelector((state) => (state.game.gameModes));

  // random question from game mode
  const gameModeSelectedId = useSelector((state) => (state.game.gameModeSelected));
  const gameModeSelected = gameModes.find((mode) => mode.id === gameModeSelectedId);
  const gameRule = gameModeSelected.rule;
  const randomQuestion = () => gameModeSelected
    .data[Math.floor(Math.random() * gameModeSelected.data.length)]
    .toUpperCase();

  return (
    <div className="bomb">
      <img className="game-logo" src={bombLogo} alt="Game Logo" />
      <motion.div
        className="notice"
        initial={{ x: -300, opacity: 1, scale: 1 }}
        animate={{ x: 0, opacity: 1, scale: 1 }}
        transition={{ type: 'spring' }}
      >
        <p className="rule">{gameRule}</p>
        <p className="question">{randomQuestion()}</p>
      </motion.div>
    </div>
  );
}

export default Bomb;
