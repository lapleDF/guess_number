import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {ROUTES} from '../constants/routes.constant';

const RootDrawer = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerType: 'front',
      }}>
      <Drawer.Group screenOptions={{headerShown: false}}>
        {ROUTES.map(item => (
          <Drawer.Screen
            key={item.name}
            name={item.name}
            component={item.component}
            options={item.options}
          />
        ))}
      </Drawer.Group>
    </Drawer.Navigator>
  );
};

export default RootDrawer;
