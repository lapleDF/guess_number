import {StyleProp, Text, TextStyle} from 'react-native';
import React from 'react';

import {COLORS} from '../../constants/color.constant';
import {useIsDarkMode} from '../../hook/useIsDarkMode';

export interface CSTextProps {
  children: any;
  size?: keyof typeof sizeText | number;
  color?: keyof typeof COLORS;
  style?: StyleProp<TextStyle>;
}
export const sizeText = {
  xs: 11,
  sm: 13,
  md: 18,
  lg: 27,
  xxl: 37,
};

const CSText = ({size = 'md', ...props}: CSTextProps) => {
  const {isDarkMode} = useIsDarkMode();
  const {color = isDarkMode === true ? 'white' : 'black'} = props;
  return (
    <Text
      style={[
        {
          fontSize: typeof size === 'number' ? size : sizeText[size],
          color: COLORS[color],
        },
        props.style,
      ]}>
      {props.children}
    </Text>
  );
};
export default CSText;
