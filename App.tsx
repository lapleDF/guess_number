import React from 'react';
import {Provider} from 'react-redux';
import store from './src/store/store';
import {NavigationContainer} from '@react-navigation/native';
import RootDrawer from './src/navigators/RootDrawer';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootDrawer />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
