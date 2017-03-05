const SET_LOCATION = 'SET_LOCATION';
// const SET_LOCATION_SUCCESS = 'SET_LOCATION_SUCCESS';
// const SET_LOCATION_FAIL = 'SET_LOCATION_FAIL';

const initialState = {
  loaded: false,
  coords: null,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_LOCATION:
      return {
        ...state,
        loaded: true,
        coords: action.coords,
      };
    // case SET_LOCATION_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     loaded: true,
    //     list: action.result.location,
    //   };
    // case SET_LOCATION_FAIL:
    //   return {
    //     ...state,
    //     loading: false,
    //     loaded: false,
    //     error: action.error
    //   };
    default:
      return state;
  }
}

export function setLocation(coords) {
  return {
    type: SET_LOCATION,
    coords,
  };
}
