// modules
import PropTypes from 'prop-types';

function GameMode({
  gameModeName, gameModeDescription, gameModeId, handleGameMode,
}) {
  return (
    <li
      className="game-mode"
      onClick={() => handleGameMode(gameModeId)}
    >
      <p className="game-mode-name">{gameModeName}</p>
      <p className="game-mode-description">{gameModeDescription}</p>
    </li>
  );
}

GameMode.propTypes = {
  gameModeName: PropTypes.string.isRequired,
  gameModeDescription: PropTypes.string.isRequired,
  gameModeId: PropTypes.number.isRequired,
  handleGameMode: PropTypes.func.isRequired,
};

export default GameMode;
