import {legacy_createStore as createStore, applyMiddleware} from 'redux';
import AsyncStorage from '@react-native-community/async-storage';
import {persistStore, persistReducer} from 'redux-persist';
import rootReducer from './RootReducer';

const store = createStore(rootReducer);
// const persistor = persistStore(store);

export {store};
