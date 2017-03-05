const LOAD_REPS = 'redux-example/auth/LOAD_US_STATE';
const LOAD_REPS_SUCCESS = 'redux-example/auth/LOAD_US_STATE_SUCCESS';
const LOAD_REPS_FAIL = 'redux-example/auth/LOAD_US_STATE_FAIL';

const initialState = {
  loaded: false,
  list: [],
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_REPS:
      return {
        ...state,
        loading: true,
        list: initialState,
      };
    case LOAD_REPS_SUCCESS:
      debugger;
      return {
        ...state,
        loading: false,
        loaded: true,
        list: action.result,
      };
    case LOAD_REPS_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function loadReps(address) {
  return {
    types: [LOAD_REPS, LOAD_REPS_SUCCESS, LOAD_REPS_FAIL],
    promise: (client) => client.get(`/reps/${address}`)
  };
}
