import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import MainNavigator from './src/navigator/MainNavigator';
import {persistor, store} from './src/redux/Store';

const App = () => {
  return (
    <Provider store={store}>
      {/* <PersistGate persistor={persistor}> */}
      <MainNavigator />
      {/* </PersistGate> */}
    </Provider>
  );
};

export default App;
