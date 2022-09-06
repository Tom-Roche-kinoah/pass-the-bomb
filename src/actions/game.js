export const LOAD_DATA = 'LOAD_DATA';
export const loadData = (data) => ({
  type: 'LOAD_DATA',
  value: data,
});

export const SET_GAME_STATE = 'SET_GAME_STATE';
export const setGameState = (newState) => ({
  type: SET_GAME_STATE,
  newState,
});

export const SET_GAME_MODE = 'SET_GAME_MODE';
export const setGameMode = (gameModeId) => ({
  type: SET_GAME_MODE,
  gameModeId,
});

export const SET_ROUNDS = 'SET_ROUNDS';
export const setRounds = (nbRounds) => ({
  type: SET_ROUNDS,
  nbRounds,
});

export const SET_BOMB_SETTING = 'SET_BOMB_SETTING';
export const setBombSetting = (bombSetting, value) => ({
  type: SET_BOMB_SETTING,
  bombSetting,
  value,
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

export const REMOVE_PLAYER = 'REMOVE_PLAYER';
export const removePlayer = (newPlayerList) => ({
  type: 'REMOVE_PLAYER',
  newPlayerList,
});

export const ENDING_ROUND = 'ENDING_ROUND';
export const endingRound = () => ({
  type: 'ENDING_ROUND',
});

export const PLAYER_LOSE = 'PLAYER_LOSE';
export const playerLose = (player) => ({
  type: 'PLAYER_LOSE',
  player,
});

export const RESET_GAME = 'RESET_GAME';
export const resetGame = () => ({
  type: 'RESET_GAME',
});
