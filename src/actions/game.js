export const SET_GAME_STATE = 'SET_GAME_STATE';
export const setGameState = (newState) => ({
  type: SET_GAME_STATE,
  newState,
});

export const CHANGE_FIELD = 'CHANGE_FIELD';
export const changeField = (value, input) => ({
  type: 'CHANGE_FIELD',
  input,
  value,
});

export const ADD_PLAYER = 'ADD_PLAYER';
export const addPlayer = () => ({
  type: 'ADD_PLAYER',
});
