// modules
import { useSelector } from 'react-redux';

// design
import './styles.scss';

function RoundEndScreen() {
  const playerList = useSelector((state) => (state.game.players));

  const handleSelectLoser = (player) => {
    alert(player);
  };

  return (
    <ul className="ending-player-list">
      <p className="game-title">Boom !</p>
      <p>Qui a explosé ?</p>
      { playerList.map((player) => (
        <button
          key={player}
          className="loser-player"
          onClick={() => handleSelectLoser(player)}
          type="button"
        >
          {player}
        </button>
      ))}
    </ul>
  );
}

export default RoundEndScreen;
