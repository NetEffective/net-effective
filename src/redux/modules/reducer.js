import { combineReducers } from 'redux';
import multireducer from 'multireducer';
import { routeReducer } from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';

import auth from './auth';
import counter from './counter';
import bills from './bills';
import {reducer as form} from 'redux-form';

export default combineReducers({
  routing: routeReducer,
  reduxAsyncConnect,
  auth,
  bills,
  form,
  multireducer: multireducer({
    counter1: counter,
    counter2: counter,
    counter3: counter,
  }),
});
