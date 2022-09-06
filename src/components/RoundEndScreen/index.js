// modules
import { useSelector, useDispatch } from 'react-redux';

// actions
import { playerLose, setGameState } from 'src/actions/game';

// design
import './styles.scss';

function RoundEndScreen() {
  const dispatch = useDispatch();
  const playerList = useSelector((state) => (state.game.players));
  const rounds = useSelector((state) => (state.game.rounds));
  const currentRound = useSelector((state) => (state.game.currentRound));

  const handleSelectLoser = (player) => {
    // save loser player
    dispatch(playerLose(player));
    dispatch(setGameState(3));
    // if no rounds left
    if (currentRound > rounds) {
      dispatch(setGameState(5));
    }
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
