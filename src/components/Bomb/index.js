// modules
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

// actions
import { } from 'src/actions/game';

// components
import PlayerList from 'src/components/PlayerList';

// design
import bombLogo from 'src/components/App/bomb_icon.svg';
import './styles.scss';
import explosion from 'src/assets/media/explosion-01.mp3';
import ticTac from 'src/assets/media/tic-tac.mp3';

const audioTicTac = new Audio(ticTac);
audioTicTac.loop = true;

const audioExplosion = new Audio(explosion);
audioExplosion.loop = false;

function Bomb() {
  const gameModes = useSelector((state) => (state.game.gameModes));
  // const rounds = useSelector((state) => (state.game.rounds));
  const [roundEnd, setRoundEnd] = useState(false);

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
    if (roundEnd) return;
    // start tic tac
    audioTicTac.play();
    const delay = randomTimer();
    let currentTime = 0;
    const timer = setInterval(() => {
      currentTime += 1;
      // console.log(currentTime);
      if (currentTime >= delay) {
        // console.log('BooOooOOom !');
        audioTicTac.pause();
        audioTicTac.currentTime = 0.0;
        audioExplosion.play();
        setRoundEnd(true);
        clearInterval(timer);
      }
    }, 1000);
  };

  return (
    <div className="bomb">
      <img className="game-logo" src={bombLogo} alt="Game Logo" />
      {bombTimer()}
      <motion.div
        className="notice"
        initial={{ x: -300, opacity: 1, scale: 1 }}
        animate={{ x: 0, opacity: 1, scale: 1 }}
        transition={{ type: 'spring' }}
      >
        <p className="rule">{gameRule}</p>
        <p className="question">{randomQuestion()}</p>
      </motion.div>

      {roundEnd && (
        <motion.div
          className="boom-screen"
          initial={{ x: 0, opacity: 1, scale: 0 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          transition={{ type: 'spring' }}
        >
          <p className="game-title">Boom !</p>
          <p>Qui a explosé ?</p>
          <PlayerList />
        </motion.div>
      )}
    </div>
  );
}

export default Bomb;
