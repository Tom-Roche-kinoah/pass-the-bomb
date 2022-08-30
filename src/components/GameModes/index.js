// modules
import { useSelector, useDispatch } from 'react-redux';

// actions
import { setGameState, setGameMode } from 'src/actions/game';

// components
import GameMode from 'src/components/GameMode';

// design
import './styles.scss';

function GameModes() {
  const dispatch = useDispatch();
  const gameModes = useSelector((state) => (state.game.gameModes));
  const handleGameMode = (gameModeId) => {
    dispatch(setGameMode(gameModeId));
    dispatch(setGameState(3));
  };

  return (
    <ul className="game-mode-list">
      { gameModes.map((gameMode) => (
        <GameMode
          key={gameMode.id}
          gameModeId={gameMode.id}
          gameModeName={gameMode.name}
          gameModeDescription={gameMode.description}
          handleGameMode={handleGameMode}
        />
      ))}
    </ul>
  );
}

export default GameModes;
