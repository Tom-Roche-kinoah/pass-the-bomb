import { useSelector, useDispatch } from 'react-redux';
import { setGameState } from 'src/actions/game';

function State() {
  const dispatch = useDispatch();
  const gameState = useSelector((state) => (state.game.state));

  return (
    <div className="state-navigation">
      <button
        type="button"
        onClick={() => dispatch(setGameState(gameState === 1 ? 1 : gameState - 1))}
      >
        Précédent
      </button>
      <button
        type="button"
        onClick={() => dispatch(setGameState(gameState === 4 ? 4 : gameState + 1))}
      >
        Suivant
      </button>
    </div>
  );
}

export default State;
