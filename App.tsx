import React from 'react';
import Home from './views/Home';
import {Provider} from 'react-redux';
import store from './src/store/store';
import {NavigationContainer} from '@react-navigation/native';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Home />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
