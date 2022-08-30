import { useSelector } from 'react-redux';

function State() {
  const gameState = useSelector((state) => (state.game.state));

  return (
    <div className="game-state">
      Etape {gameState}
    </div>
  );
}

export default State;
