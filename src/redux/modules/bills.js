const LOAD_BILLS = 'LOAD_BILLS';
const LOAD_BILLS_SUCCESS = 'LOAD_BILLS_SUCCESS';
const LOAD_BILLS_FAIL = 'LOAD_BILLS_FAIL';

const initialState = {
  loaded: false,
  currentUsState: null,
  list: [],
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_BILLS:
      return {
        ...state,
        loading: true,
        list: initialState.list,
      };
    case LOAD_BILLS_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        list: action.result.bills,
      };
    case LOAD_BILLS_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error,
      };
    default:
      return state;
  }
}

export function loadBills(stateCode = '') {
  return {
    types: [LOAD_BILLS, LOAD_BILLS_SUCCESS, LOAD_BILLS_FAIL],
    promise: (client) => client.get(`/bills/state/${stateCode ? stateCode.toUpperCase() : ''}`)
  };
}
