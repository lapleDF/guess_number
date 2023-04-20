import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import React from 'react';
import {useIsDarkMode} from '../../hook/useIsDarkMode';
import {COLORS} from '../../constants/color.constant';

interface CSContainerProps {
  children: any;
  style?: StyleProp<ViewStyle>;
}

const CSContainer = (props: CSContainerProps) => {
  const {isDarkMode} = useIsDarkMode();
  return (
    <View
      style={[
        styles.container,
        {backgroundColor: isDarkMode ? COLORS.bgDark : COLORS.bgLight},
        props.style,
      ]}>
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});

export default CSContainer;
