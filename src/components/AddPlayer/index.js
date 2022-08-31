// modules
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

// components
import NavButtonNext from 'src/components/NavButtonNext';

// actions
import { changeField, addPlayer } from 'src/actions/game';

// design
import './styles.scss';

function AddPLayer() {
  useEffect(() => {
    // document.getElementById('playerNameInput').focus();
    document.getElementById('playerNameInput').onfocus = () => {
      window.scrollTo(0, 0);
      document.body.scrollTop = 0;
    };
  });

  const dispatch = useDispatch();
  const playerList = useSelector((state) => (state.game.players));
  const playerNameInput = useSelector((state) => (state.game.playerNameInput));
  const playerCounter = playerList.length;

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
      <input
        id="playerNameInput"
        className="player-name-input"
        type="text"
        placeholder="Ajouter un joueur"
        value={playerNameInput}
        name="playerNameInput"
        required="required"
        onChange={(e) => dispatch(changeField(e.target.value, 'playerNameInput'))}
      />
      <button
        className="player-name-add-button"
        type="submit"
      >
        ✚
      </button>
      {playerCounter > 1 && (
        <NavButtonNext newState={2} />
      )}
    </form>
  );
}

export default AddPLayer;
