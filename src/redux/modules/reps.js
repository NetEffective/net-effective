const LOAD_REPS = 'LOAD_REPS';
const LOAD_REPS_SUCCESS = 'LOAD_REPS_SUCCESS';
const LOAD_REPS_FAIL = 'LOAD_REPS_FAIL';

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
        list: initialState.list,
      };
    case LOAD_REPS_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        list: action.result.reps,
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
    promise: (client) => client.get(`/reps?address=${address}`)
  };
}
