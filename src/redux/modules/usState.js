const SET_US_STATE = 'SET_US_STATE';

const RED = 'RED';
const BLUE = 'BLUE';

const initialState = {
  loaded: false,
  current: {},
};

const usStates = {
  AR: {
    code: 'AR',
    name: 'Arkansas',
    color: RED,
  },
  CA: {
    code: 'CA',
    name: 'California',
    color: BLUE,
  }
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_US_STATE:
      return {
        ...state,
        loaded: true,
        current: action.stateCode ? usStates[action.stateCode.toUpperCase()] : {},
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
