import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from '../../views/Home';
import History from '../../views/History';
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
        drawerContentContainerStyle: {width: 200},
        drawerType: 'front',
        // drawerContentStyle: {backgroundColor: COLORS.grey, elevation: 7},
        drawerItemStyle: {backgroundColor: COLORS.grey},
        // drawerLabelStyle: {color: COLORS.primary, fontSize: },
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
