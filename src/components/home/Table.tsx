import {StyleSheet, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import CSText from '../core/CSText';
import {SPACING} from '../../utils/spacing.constant';
import {COLORS} from '../../utils/color.constant';

const Table = () => {
  return (
    <View style={styles.container}>
      <View style={styles.thead}>
        <CSText textAlign="center" style={[styles.thead50, styles.cell]}>
          Your guess
        </CSText>
        <CSText textAlign="center" style={[styles.thead23, styles.cell]}>
          Correct numbers
        </CSText>
        <CSText textAlign="center" style={[styles.thead23, styles.cell]}>
          Correct positions
        </CSText>
      </View>
      {[...Array(10)].map((_, index) => {
        return (
          <View
            style={[styles.tbody, index === 9 && styles.tbodyLast]}
            key={index}>
            <CSText
              textAlign="center"
              style={[styles.thead50number, styles.cell]}>
              1234
            </CSText>
            <CSText textAlign="center" style={[styles.thead23, styles.cell]}>
              3
            </CSText>
            <CSText textAlign="center" style={[styles.thead23, styles.cell]}>
              6
            </CSText>
          </View>
        );
      })}
    </View>
  );
};

export default Table;

const styles = StyleSheet.create({
  container: {
    width: SPACING.width,
    alignItems: 'center',
    paddingHorizontal: SPACING.px,
  },
  thead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    gap: 2,
    borderColor: COLORS.stroke,
    borderWidth: 3,
    borderRightWidth: 0,
    backgroundColor: COLORS.secondary,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    overflow: 'hidden',
  },
  tbody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    gap: 2,
    borderLeftColor: COLORS.stroke,
    borderLeftWidth: 3,
    borderBottomColor: COLORS.stroke,
    borderBottomWidth: 3,
  },
  tbodyLast: {
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    overflow: 'hidden',
  },
  thead50: {
    width: '50%',
  },
  thead23: {
    width: '23%',
  },
  thead50number: {
    width: '50%',
    letterSpacing: 10,
  },
  cell: {
    borderColor: COLORS.stroke,
    borderRightWidth: 3,
    height: '100%',
    textAlignVertical: 'center',
    paddingVertical: 10,
  },
});
