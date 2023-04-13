import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import CSText, {sizeText} from './CSText';
import {COLORS} from '../../utils/color.constant';

interface CSButtonProps {
  children?: any;
  type?: keyof typeof type;
  style?: StyleProp<ViewStyle>;
  title?: any;
  onPress: () => void;
  boldText?: any;
  sizeText?: keyof typeof sizeText;
  textAlign?: any;
}

const CSButton = (props: CSButtonProps) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[type[props.type || 'primary'].btn]}>
      <CSText
        bold={props.boldText || 'normal'}
        size={props.sizeText || 'md'}
        textAlign={props.textAlign || 'center'}
        style={[[type[props.type || 'primary'].textBtn]]}>
        {props.title}
      </CSText>
      {props.children}
    </TouchableOpacity>
  );
};

const type = {
  primary: StyleSheet.create({
    btn: {
      paddingHorizontal: 10,
      paddingVertical: 8,
      backgroundColor: COLORS.primary,
      borderRadius: 8,
    },
    textBtn: {
      color: COLORS.white,
    },
  }),
  secondary: StyleSheet.create({
    btn: {
      paddingHorizontal: 10,
      paddingVertical: 8,
      backgroundColor: COLORS.secondary,
      borderRadius: 8,
    },
    textBtn: {
      color: COLORS.white,
    },
  }),
};

export default CSButton;

const styles = StyleSheet.create({});
