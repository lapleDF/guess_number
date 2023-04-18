import {StyleProp, StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';
import React from 'react';
import CSText from './CSText';
import {COLORS} from '../../constants/color.constant';

interface CSButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  style?: StyleProp<ViewStyle>;
}

const CSButton = ({variant = 'primary', ...props}: CSButtonProps) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[styles.btn, styles[variant], props.style]}>
      <CSText>{props.title}</CSText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  primary: {
    backgroundColor: COLORS.primary,
    color: COLORS.white,
  },
  secondary: {
    color: COLORS.primary,
    borderColor: COLORS.primary,
    borderWidth: 1,
  },
});

export default CSButton;
