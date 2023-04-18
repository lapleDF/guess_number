import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from '../screens/Home';
import History from '../screens/History';

const RootDrawer = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerType: 'front',
      }}>
      <Drawer.Group screenOptions={{headerShown: false}}>
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="History" component={History} />
      </Drawer.Group>
    </Drawer.Navigator>
  );
};

export default RootDrawer;
