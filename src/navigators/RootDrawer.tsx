import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from '../screens/Home';
import History from '../screens/History';
import {COLORS} from '../utils/color.constant';
import Icon from 'react-native-vector-icons/Feather';
import CSText from '../components/core/CSText';

// interface DrawItemProps {
//   nameIcon: string;
//   label: string;
// }

// const DrawItem = (props: DrawItemProps) => {
//   <View style={sty}></View>
// };

const RootDrawer = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerType: 'front',
      }}>
      <Drawer.Group screenOptions={{headerShown: false}}>
        <Drawer.Screen
          name="Home"
          component={Home}
          // options={{
          //   drawerIcon: () => {
          //     return <Icon name="user" size={30} color={COLORS.white} />;
          //   },
          //   drawerLabel: () => {
          //     return <CSText>Home</CSText>;
          //   },
          // }}
        />
        <Drawer.Screen
          name="History"
          component={History}
          // options={{
          //   drawerIcon: () => {
          //     return <Icon name="user" size={30} color={COLORS.white} />;
          //   },
          //   drawerLabel: () => {
          //     return <CSText>History</CSText>;
          //   },
          // }}
        />
      </Drawer.Group>
    </Drawer.Navigator>
  );
};

export default RootDrawer;
