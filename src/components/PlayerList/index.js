// modules
import { useSelector } from 'react-redux';

// components
import Player from 'src/components/Player';

// design
import './styles.scss';

function PlayerList() {
  const playerList = useSelector((state) => (state.game.players));

  return (
    <ul className="player-list">
      { playerList.map((player) => (
        <Player
          key={player}
          playerName={player}
        />
      ))}
    </ul>
  );
}

export default PlayerList;
