import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useRef, useState} from 'react';
import CSText from '../core/CSText';
import {SPACING} from '../../utils/spacing.constant';
import Icon from 'react-native-vector-icons/FontAwesome5';
import IconFeather from 'react-native-vector-icons/Feather';
import {COLORS} from '../../utils/color.constant';
import store, {RootState} from '../../store/store';
import {GUESS_LIST_ACTION} from '../../store/actions/guessListAction.constant';
import {GuessRecord} from '../../@type/GuessRecord';
import {initialGuessRecord} from '../../@type/GuessRecord';
import uuid from 'react-uuid';
import CSModal from '../core/CSModal';
import {useSelector} from 'react-redux';
import {RoundListType} from '../../@type/RoundListType';

const InputControl = () => {
  const [inputValue, setInputValue] = useState<GuessRecord>(initialGuessRecord);
  const refCSModal = useRef<any>(null);
  const [errMess, setErrMess] = useState<string>('');
  const rounds: RoundListType = useSelector((state: RootState) => state.rounds);

  const handleGuess = () => {
    let listNumber: GuessRecord[] =
      rounds.roundList[rounds.roundList.length - 1]?.guessList;
    if (listNumber?.length === 10) {
      setErrMess('Your have run out of guesses!');
      refCSModal.current.open();
      return;
    }
    if (
      inputValue.yourGuess.length !==
      rounds.roundList[rounds.roundList.length - 1].numNumber
    ) {
      setErrMess(
        `Your guess numbers must be ${
          rounds.roundList[rounds.roundList.length - 1].numNumber
        } numbers!`,
      );
      refCSModal.current.open();
      return;
    }

    let expectedNumber: number[] =
      rounds.roundList[rounds.roundList.length - 1]?.expectedNumber;
    let inputValueTemp: GuessRecord = inputValue;
    let correctNumbers: number = 0;
    let correctPositions: number = 0;

    inputValueTemp.yourGuess.forEach((element, index) => {
      if (expectedNumber?.includes(element)) {
        correctNumbers += 1;
        if (expectedNumber?.indexOf(element, index) === index) {
          correctPositions += 1;
        }
      }
    });

    inputValueTemp.correctNumber = correctNumbers;
    inputValueTemp.correctPosition = correctPositions;

    store.dispatch({
      type: GUESS_LIST_ACTION.addRecord,
      payload: inputValueTemp,
    });
    setInputValue({...inputValue, yourGuess: [], id: uuid()});
  };

  const handleDelete = () => {
    let arrTemp = inputValue.yourGuess;
    arrTemp.pop();
    setInputValue({...inputValue, yourGuess: arrTemp});
  };

  const handlePressKey = (value: number) => {
    if (
      inputValue.yourGuess.length <
      rounds.roundList[rounds.roundList.length - 1].numNumber
    ) {
      if (inputValue.yourGuess.includes(value)) {
        setErrMess('Numbers can not be the same!');
        refCSModal.current.open();
        return;
      }
      let arrTemp = inputValue.yourGuess;
      arrTemp.push(value);
      setInputValue({...inputValue, yourGuess: arrTemp});
    }
  };

  return (
    <View style={styles.container}>
      <CSModal refRBSheet={refCSModal} height="auto">
        <CSText color="red" bold={600} size="lg">
          Invalid number!
        </CSText>
        <CSText color="stroke">{errMess}</CSText>
      </CSModal>
      <View style={styles.inputField}>
        <CSText
          style={styles.inputFieldText}
          textAlign="center"
          bold="bold"
          size="lg">
          {inputValue.yourGuess.join('')}
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
              <CSText style={styles.numberPress} textAlign={'center'}>
                {index + 1}
              </CSText>
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
    textAlignVertical: 'center',
  },
  btnDelete: {
    width: ((SPACING.width - 8) * 20) / 100,
    paddingVertical: 10,
    backgroundColor: COLORS.red,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
