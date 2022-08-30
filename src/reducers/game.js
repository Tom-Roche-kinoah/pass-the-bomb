export const initialState = {
  state: 1,
  players: [],
  playerNameInput: '',
  bombMinTime: 20,
  bombMaxTime: 90,
  rounds: 5,
  isLoading: false,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case 'SET_GAME_STATE':
      return {
        ...state,
        state: action.newState,
      };
    case 'CHANGE_FIELD':
      return {
        ...state,
        [action.input]: action.value,
      };
    case 'ADD_PLAYER':
      return {
        ...state,
        players: [...state.players, state.playerNameInput],
        playerNameInput: '',
      };
    default:
      return state;
  }
};

export default reducer;
