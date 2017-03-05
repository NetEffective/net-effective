import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';

import auth from './auth';
import bills from './bills';
import usState from './usState';
import reps from './reps';
import {reducer as form} from 'redux-form';

export default combineReducers({
  routing: routeReducer,
  reduxAsyncConnect,
  auth,
  bills,
  form,
  usState,
  reps,
});
