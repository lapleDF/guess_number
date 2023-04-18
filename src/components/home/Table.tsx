import React from 'react';
import {useSelector} from 'react-redux';
import {StyleSheet, View} from 'react-native';

import {SPACING} from '../../constants/spacing.constant';
import {COLORS} from '../../constants/color.constant';
import {RootState} from '../../store/store';
import CSText from '../core/CSText';
import {GuessRecord} from '../../interface/GuessRecord';

const Table = () => {
  const guessList: GuessRecord[] = useSelector(
    (state: RootState) => state.guesses.guessList,
  );
  return (
    <View style={styles.container}>
      <View style={styles.thead}>
        <CSText style={[styles.thead50, styles.cell]}>Your guess</CSText>
        <CSText style={[styles.thead23, styles.cell]}>Correct numbers</CSText>
        <CSText style={[styles.thead23, styles.cell]}>Correct positions</CSText>
      </View>
      {guessList.map((item, index) => {
        return (
          <View
            style={[styles.tbody, index === 9 && styles.tbodyLast]}
            key={index}>
            <CSText style={[styles.thead50number, styles.cell]}>
              {item.yourGuess.join('')}
            </CSText>
            <CSText style={[styles.thead23, styles.cell]}>
              {item.correctNumber}
            </CSText>
            <CSText style={[styles.thead23, styles.cell]}>
              {item.correctPosition}
            </CSText>
          </View>
        );
      })}
      {guessList.length < 10 &&
        [...Array(10 - guessList.length)].map((_, index) => {
          return (
            <View
              style={[
                styles.tbody,
                index === 9 - guessList.length && styles.tbodyLast,
              ]}
              key={index}>
              <CSText style={[styles.thead50number, styles.cell]}>{''}</CSText>
              <CSText style={[styles.thead23, styles.cell]}>{''}</CSText>
              <CSText style={[styles.thead23, styles.cell]}>{''}</CSText>
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
    textAlign: 'center',
  },
});
