
import { combineReducers } from "@reduxjs/toolkit";
import AuthReducer from '../reducers/Authreducer';

const rootReducers = combineReducers({
  auth: AuthReducer
});

export default rootReducers;
