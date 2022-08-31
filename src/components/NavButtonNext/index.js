// modules
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

// actions
import { setGameState } from 'src/actions/game';

// design
import arrowRight from './arrow-right.svg';

function NavButtonNext({ newState }) {
  const dispatch = useDispatch();

  return (
    <button
      className="next-step"
      type="button"
      onClick={() => dispatch(setGameState(newState))}
    >
      <img src={arrowRight} alt="Arrow Right" />
    </button>
  );
}

NavButtonNext.propTypes = {
  newState: PropTypes.number.isRequired,
};

export default NavButtonNext;
