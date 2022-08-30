import { useSelector, useDispatch } from 'react-redux';

// actions
import { changeField } from 'src/actions/game';

// design
import './styles.scss';

function PlayerList() {
  const dispatch = useDispatch();
  const playerList = useSelector((state) => (state.game.players));

  return (
    <ul className="player-list">
      { playerList.map((player) => (
        <li
          key={player}
        >
          {player}
        </li>
      ))}
    </ul>
  );
}

export default PlayerList;
