import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useRef, useState} from 'react';
import CSText from '../core/CSText';
import {SPACING} from '../../utils/spacing.constant';
import Icon from 'react-native-vector-icons/FontAwesome5';
import IconFeather from 'react-native-vector-icons/Feather';
import {COLORS} from '../../utils/color.constant';
import store from '../../store/store';
import {GUESS_LIST_ACTION} from '../../store/actions/guessListAction.constant';
import {GuessRecord} from '../../@type/GuessRecord';
import {initialGuessRecord} from '../../@type/GuessRecord';
import uuid from 'react-uuid';
import CSModal from '../core/CSModal';

const InputControl = () => {
  const [inputValue, setInputValue] = useState<GuessRecord>(initialGuessRecord);
  const refCSModal = useRef<any>(null);

  const handleGuess = () => {
    if (inputValue.yourGuess.length !== 4) {
      refCSModal.current.open();
      return;
    }
    store.dispatch({type: GUESS_LIST_ACTION.addRecord, payload: inputValue});
    setInputValue({...inputValue, yourGuess: [], id: uuid()});
  };

  const handleDelete = () => {
    let arrTemp = inputValue.yourGuess;
    arrTemp.pop();
    setInputValue({...inputValue, yourGuess: arrTemp});
  };

  const handlePressKey = (value: number) => {
    if (inputValue.yourGuess.length < 4) {
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
        <CSText color="stroke">Your guess numbers must be 4 numbers!</CSText>
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
