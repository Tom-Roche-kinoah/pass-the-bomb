export const initialState = {
  state: 1,
  players: [],
  bombMinTime: 20,
  bombMaxTime: 90,
  rounds: 5,
  isLoading: false,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case 'LOAD_DATA':
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
};

export default reducer;
