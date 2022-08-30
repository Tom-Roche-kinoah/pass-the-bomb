// modules
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';

// actions
import { removePlayer } from 'src/actions/game';

function Player({ playerName }) {
  const playerList = useSelector((state) => (state.game.players));
  const dispatch = useDispatch();

  const handleRemovePlayer = (playerToRemove) => {
    const newPlayerList = playerList.filter((player) => player !== playerToRemove);
    dispatch(removePlayer(newPlayerList));
  };

  return (
    <motion.li
      className="player-name"
      initial={{ opacity: 0, x: 5 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: 'spring' }}
    >
      <span className="player-name-text">
        {playerName}
      </span>
      <button
        type="button"
        onClick={() => handleRemovePlayer(playerName)}
      >
        x
      </button>
    </motion.li>
  );
}

Player.propTypes = {
  playerName: PropTypes.string.isRequired,
};

export default Player;
