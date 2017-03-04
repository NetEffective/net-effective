const LOAD_BILLS = 'redux-example/auth/LOAD_US_STATE';
const LOAD_BILLS_SUCCESS = 'redux-example/auth/LOAD_US_STATE_SUCCESS';
const LOAD_BILLS_FAIL = 'redux-example/auth/LOAD_US_STATE_FAIL';

const initialState = {
  loaded: false,
  bills: [],
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_BILLS:
      return {
        ...state,
        loading: true,
        bills: initialState.bills,
      };
    case LOAD_BILLS_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        bills: action.payload
      };
    case LOAD_BILLS_FAIL:
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

export function loadBills(stateCode) {
  debugger;
  return {
    types: [LOAD_BILLS, LOAD_BILLS_SUCCESS, LOAD_BILLS_FAIL],
    promise: (client) => client.get(`/bills/state/${stateCode.toUpperCase()}`)
  };
}
