// modules
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

// actions
import { removePlayer } from 'src/actions/game';

// design
import './styles.scss';

function Player({ playerName }) {
  const playerList = useSelector((state) => (state.game.players));
  const dispatch = useDispatch();
  const handleRemovePlayer = (playerToRemove) => {
    const newPlayerList = playerList.filter((player) => player !== playerToRemove);
    console.table(newPlayerList);
    dispatch(removePlayer(newPlayerList));
  };

  return (
    <li
      className="player-name"
    >
      {playerName}
      <button
        type="button"
        onClick={() => handleRemovePlayer(playerName)}
      >
        x
      </button>
    </li>
  );
}

Player.propTypes = {
  playerName: PropTypes.string.isRequired,
};

export default Player;
