import {combineReducers} from 'redux';
import infoReducer from './Reducer';

const rootReducer = combineReducers({
  //   themeReducer: themeReducer,
  infoReducer,
});

export default rootReducer;
