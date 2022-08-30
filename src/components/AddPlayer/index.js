import { useSelector, useDispatch } from 'react-redux';

// actions
import { changeField, addPlayer } from 'src/actions/game';

// design
import './styles.scss';

function AddPLayer() {
  const dispatch = useDispatch();
  const playerList = useSelector((state) => (state.game.players));
  const playerNameInput = useSelector((state) => (state.game.playerNameInput));

  const handleAddPlayer = (e) => {
    e.preventDefault();
    // if player is already in list -> stop
    if (playerList.find((player) => player.toLowerCase() === playerNameInput.toLowerCase())) {
      return;
    }
    // if valid input -> dispatch
    if (playerNameInput.trim()) {
      dispatch(addPlayer());
      document.getElementById('playerNameInput').focus();
    }
  };

  return (
    <form
      className="add-player"
      onSubmit={(e) => handleAddPlayer(e)}
      method="post"
    >
      <p>Ajouter des joueurs :</p>
      <input
        id="playerNameInput"
        type="text"
        placeholder="Nom de joueur"
        value={playerNameInput}
        name="playerNameInput"
        required="required"
        onChange={(e) => dispatch(changeField(e.target.value, 'playerNameInput'))}
      />
      <button
        type="submit"
      >
        +
      </button>
    </form>
  );
}

export default AddPLayer;
