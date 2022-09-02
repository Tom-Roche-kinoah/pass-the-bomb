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
  const rounds = useSelector((state) => (state.game.rounds));

  // random question from game mode
  const gameModeSelectedId = useSelector((state) => (state.game.gameModeSelected));
  const gameModeSelected = gameModes.find((mode) => mode.id === gameModeSelectedId);
  const gameRule = gameModeSelected.rule;
  const randomQuestion = () => gameModeSelected
    .data[Math.floor(Math.random() * gameModeSelected.data.length)]
    .toUpperCase();

  // random time before bomb explode !
  const bombMinTime = useSelector((state) => (state.game.bombMinTime));
  const bombMaxTime = useSelector((state) => (state.game.bombMaxTime));
  const randomTimer = () => (
    Math.floor((Math.random() * (bombMaxTime - bombMinTime + 1)) + bombMinTime)
  );

  const bombTimer = () => {
    const delay = randomTimer();
    let currentTime = 0;
    const timer = setInterval(() => {
      currentTime += 1;
      console.log(currentTime);
      if (currentTime >= delay) {
        console.log('BooOooOOom !');
        clearInterval(timer);
      }
    }, 1000);
  };

  bombTimer();

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
