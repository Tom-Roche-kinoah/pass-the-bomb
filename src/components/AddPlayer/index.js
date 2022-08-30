import { useSelector, useDispatch } from 'react-redux';

// actions
import { changeField, addPlayer } from 'src/actions/game';

// design
import './styles.scss';

function AddPLayer() {
  const dispatch = useDispatch();
  const playerNameInput = useSelector((state) => (state.game.playerNameInput));

  const handleAddPlayer = (e) => {
    e.preventDefault();
    if (playerNameInput.trim()) {
      dispatch(addPlayer());
      document.getElementById('playerNameInput').focus();
    }
  };

  return (
    <form
      className="add-player"
      onSubmit={(e) => handleAddPlayer(e)}
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
