// modules
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

// actions
import { setBombSetting } from 'src/actions/game';

function BombSettingButton({
  bombSetting,
  currentValue,
  value,
  text,
}) {
  const dispatch = useDispatch();

  return (
    <button
      type="button"
      className={currentValue === value ? 'bomb-setting-btn active' : 'bomb-setting-btn'}
      onClick={() => dispatch(setBombSetting(bombSetting, value))}
    >
      {text}
    </button>
  );
}

BombSettingButton.propTypes = {
  bombSetting: PropTypes.string.isRequired,
  currentValue: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
};

export default BombSettingButton;
