import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import React, {useRef, useState} from 'react';
import {useSelector} from 'react-redux';
import IconFeather from 'react-native-vector-icons/Feather';

import {GUESS_LIST_ACTION} from '../../store/actions/guessListAction.constant';
import {RootState, appDispatch} from '../../store/store';
import {RoundListType} from '../../interface/RoundListType';
import {SPACING} from '../../constants/spacing.constant';
import {COLORS} from '../../constants/color.constant';
import CSModal from '../core/CSModal';
import CSText from '../core/CSText';

const InputControl = () => {
  const [inputValue, setInputValue] = useState<number[]>([]);
  const refCSModal = useRef<any>(null);
  const [errMess, setErrMess] = useState<string>('');
  const rounds: RoundListType = useSelector((state: RootState) => state.rounds);
  const numNumber = rounds.roundList[rounds.roundList.length - 1]?.numNumber;

  const handleGuess = () => {
    // validate whether input number not valid
    if (inputValue.length !== numNumber) {
      setErrMess(`Your guess numbers must be ${numNumber} numbers!`);
      refCSModal.current.open();
      return;
    }
    appDispatch(GUESS_LIST_ACTION.RECEIVE_NUMBER, inputValue);
    setInputValue([]);
  };

  const handleDelete = () => {
    setInputValue(inputValue.slice(0, -1));
  };

  const handlePressKey = (value: number) => {
    if (inputValue.length < numNumber) {
      if (inputValue.includes(value)) {
        setErrMess('Numbers can not be the same!');
        refCSModal.current.open();
        return;
      }
      setInputValue([...inputValue, value]);
    }
  };

  return (
    <View style={styles.container}>
      <CSModal refRBSheet={refCSModal}>
        <CSText color="red" size="lg">
          Invalid number!
        </CSText>
        <CSText color="stroke">{errMess}</CSText>
      </CSModal>
      <View style={styles.inputField}>
        <CSText style={styles.inputFieldText} size="lg">
          {inputValue.join('')}
        </CSText>
        <TouchableOpacity onPress={handleGuess} style={styles.guessBtn}>
          <Icon name="arrow-alt-circle-up" size={32} color={COLORS.white} />
        </TouchableOpacity>
      </View>
      <View style={styles.keyKoard}>
        {[...Array(9)].map((_, index) => {
          return (
            <TouchableOpacity
              activeOpacity={0.6}
              key={index}
              style={styles.keyBoardItem}
              onPress={() => handlePressKey(index + 1)}>
              <CSText style={styles.numberPress}>{index + 1}</CSText>
            </TouchableOpacity>
          );
        })}
        <TouchableOpacity
          style={styles.btnDelete}
          onPress={handleDelete}
          activeOpacity={0.6}>
          <IconFeather name="delete" size={20} color={COLORS.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default InputControl;

const styles = StyleSheet.create({
  container: {
    width: SPACING.width,
    marginHorizontal: SPACING.px,
    rowGap: 2,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: COLORS.white,
  },
  inputField: {
    width: '100%',
    backgroundColor: COLORS.secondary,
    paddingVertical: 10,
    letterSpacing: 15,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputFieldText: {
    letterSpacing: 15,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  guessBtn: {
    position: 'absolute',
    right: 20,
    borderRadius: 8,
    overflow: 'hidden',
  },
  keyKoard: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 2,
  },
  keyBoardItem: {
    width: ((SPACING.width - 8) * 20) / 100,
    paddingVertical: 10,
    backgroundColor: COLORS.terarity,
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberPress: {
    color: COLORS.white,
    textAlignVertical: 'center',
    fontWeight: 'bold',
  },
  btnDelete: {
    width: ((SPACING.width - 8) * 20) / 100,
    paddingVertical: 10,
    backgroundColor: COLORS.red,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
