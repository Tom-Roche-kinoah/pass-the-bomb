// modules
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';

// actions
import { endingRound, setGameState } from 'src/actions/game';

// components
import RoundEndScreen from 'src/components/RoundEndScreen';

// design
import bombLogo from 'src/components/App/bomb_icon.svg';
import './styles.scss';
import explosion from 'src/assets/media/explosion-01.mp3';
import ticTac from 'src/assets/media/tic-tac.mp3';

const audioTicTac = new Audio(ticTac);
const audioExplosion = new Audio(explosion);

function Bomb() {
  const dispatch = useDispatch();
  const gameModes = useSelector((state) => (state.game.gameModes));
  const rounds = useSelector((state) => (state.game.rounds));
  const currentRound = useSelector((state) => (state.game.currentRound));
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

  let timer = null;
  const bombTimer = () => {
    if (roundEnd) return;
    // start tic tac
    audioTicTac.play();
    audioTicTac.loop = true;
    const delay = randomTimer();
    let currentTime = 0;
    timer = setInterval(() => {
      currentTime += 1;
      // console.log(currentTime);
      if (currentTime >= delay) {
        // console.log('BooOooOOom !');
        audioTicTac.currentTime = 0.0;
        audioTicTac.pause();
        audioExplosion.play();
        setRoundEnd(true);
        dispatch(endingRound());
        clearInterval(timer);
      }
    }, 1000);
  };

  useEffect(() => {
    bombTimer();
  }, []);

  const handleStopGame = () => {
    audioTicTac.currentTime = 0.0;
    audioTicTac.pause();
    clearInterval(timer);
    dispatch(setGameState(2));
  };

  return (
    <div className="bomb">
      <button
        className="stop-game-btn"
        type="button"
        onClick={() => handleStopGame()}
      >
        ×
      </button>
      <p>Manche {currentRound} sur {rounds}</p>
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

      {roundEnd && (
        <motion.div
          className="boom-screen"
          initial={{ x: 0, opacity: 1, scale: 0 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          transition={{ type: 'spring' }}
        >
          <RoundEndScreen />
        </motion.div>
      )}
    </div>
  );
}

export default Bomb;
