const SET_US_STATE = 'SET_US_STATE';

const initialState = {
  loaded: false,
  currentUsState: null,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_US_STATE:
      return {
        ...state,
        loaded: true,
        currentUsState: action.stateCode.toUpperCase()
      };
    default:
      return state;
  }
}

export function setUsState(stateCode) {
  return {
    type: SET_US_STATE,
    stateCode
  };
}
