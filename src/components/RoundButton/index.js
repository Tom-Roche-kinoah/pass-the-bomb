// modules
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

// actions
import { setRounds } from 'src/actions/game';

function RoundButton({ roundCurrent, rounds }) {
  const dispatch = useDispatch();

  return (
    <button
      type="button"
      className={roundCurrent === rounds ? 'round-btn active' : 'round-btn'}
      onClick={() => dispatch(setRounds(rounds))}
    >
      {rounds}
    </button>
  );
}

RoundButton.propTypes = {
  roundCurrent: PropTypes.number.isRequired,
  rounds: PropTypes.number.isRequired,
};

export default RoundButton;
