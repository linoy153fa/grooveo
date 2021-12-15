const initialState = {
  isLoading: false,
  isPlaying: false,
};

export function playerSettingsReducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'LOADING_START':
      return { ...state, isLoading: true }
    case 'LOADING_DONE':
      return { ...state, isLoading: false }
    case 'TOGGLE':
      return { ...state, isPlaying: action.isPlaying }
    case 'LOOP_ENDED':
      return { ...state, isloopEnded: true }
    case 'NEW_LOOP_STATRED':
      return { ...state, isloopEnded: false }
    default: return state
  }
}
