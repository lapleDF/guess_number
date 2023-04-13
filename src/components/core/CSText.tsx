import {StyleProp, StyleSheet, Text, TextStyle} from 'react-native';
import React from 'react';
import {COLORS} from '../../utils/color.constant';

interface CSTextProps {
  children: any;
  size?: keyof typeof sizeText;
  color?: keyof typeof COLORS;
  bold?: any;
  style?: StyleProp<TextStyle>;
  textAlign?: any;
}

const CSText = (props: CSTextProps) => {
  return (
    <Text
      style={[
        sizeText[props.size || 'md'].text,
        {
          fontWeight: props.bold || 'normal',
          color: COLORS[props.color || 'white'],
          textAlign: props.textAlign || 'left',
        },
        props.style,
      ]}>
      {props.children}
    </Text>
  );
};

export const sizeText = {
  xs: StyleSheet.create({
    text: {fontSize: 11},
  }),
  sm: StyleSheet.create({
    text: {fontSize: 13},
  }),
  md: StyleSheet.create({
    text: {fontSize: 18},
  }),
  lg: StyleSheet.create({
    text: {fontSize: 27},
  }),
  xxl: StyleSheet.create({
    text: {fontSize: 37},
  }),
};

export default CSText;
