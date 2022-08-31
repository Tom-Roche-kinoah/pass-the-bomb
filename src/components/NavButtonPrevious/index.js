// modules
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

// actions
import { setGameState } from 'src/actions/game';

// design
import arrowLeft from './arrow-left.svg';

function NavButtonPrevious({ newState }) {
  const dispatch = useDispatch();

  return (
    <button
      className="prev-step"
      type="button"
      onClick={() => dispatch(setGameState(newState))}
    >
      <img src={arrowLeft} alt="Arrow Left" />
    </button>
  );
}

NavButtonPrevious.propTypes = {
  newState: PropTypes.number.isRequired,
};

export default NavButtonPrevious;
