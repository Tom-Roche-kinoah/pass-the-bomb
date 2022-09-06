export const initialState = {
  state: 1,
  players: [],
  scores: [],
  playerNameInput: '',
  bombMinTime: 20,
  bombMaxTime: 90,
  rounds: 9,
  currentRound: 1,
  gameModes: [],
  gameModeSelected: 1,
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
    case 'SET_GAME_MODE':
      return {
        ...state,
        gameModeSelected: action.gameModeId,
      };
    case 'SET_ROUNDS':
      return {
        ...state,
        rounds: action.nbRounds,
      };
    case 'SET_BOMB_SETTING':
      return {
        ...state,
        [action.bombSetting]: action.value,
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
    case 'ENDING_ROUND':
      return {
        ...state,
        currentRound: state.currentRound + 1,
      };
    case 'PLAYER_LOSE':
      return {
        ...state,
        scores: [...state.scores, action.player],
      };
    case 'RESET_GAME':
      return {
        ...state,
        scores: [],
        currentRound: 1,
      };
    default:
      return state;
  }
};

export default reducer;
