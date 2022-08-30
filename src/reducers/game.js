export const initialState = {
  state: 1,
  players: ['Tommy', 'Louise', 'Camille'],
  playerNameInput: '',
  bombMinTime: 20,
  bombMaxTime: 90,
  rounds: 5,
  gameModes: [],
  isLoading: false,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case 'LOAD_DATA':
      return {
        ...state,
        gameModes: action.value,
      };
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
    case 'REMOVE_PLAYER':
      return {
        ...state,
        players: action.newPlayerList,
      };
    default:
      return state;
  }
};

export default reducer;
