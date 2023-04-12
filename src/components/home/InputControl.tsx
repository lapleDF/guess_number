import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import CSText from '../core/CSText';
import {SPACING} from '../../utils/spacing.constant';
import Icon from 'react-native-vector-icons/FontAwesome5';
import IconFeather from 'react-native-vector-icons/Feather';
import {COLORS} from '../../utils/color.constant';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/store';

const InputControl = () => {
  const [inputValue, setInputValue] = useState<any[]>([]);
  const guessList = useSelector((state: RootState) => state.guesses);
  console.log('guessList', guessList);
  const handleGuess = () => {
    console.log('handle guess');
  };

  const handleDelete = () => {
    setInputValue(prev => prev.slice(0, -1));
  };

  const handlePressKey = (value: number) => {
    if (inputValue.length < 4) {
      setInputValue([...inputValue, value]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputField}>
        <CSText
          style={styles.inputFieldText}
          textAlign="center"
          bold="bold"
          size="lg">
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
    paddingVertical: 8,
    backgroundColor: COLORS.terarity,
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberPress: {
    textAlignVertical: 'center',
  },
  btnDelete: {
    width: ((SPACING.width - 8) * 20) / 100,
    paddingVertical: 8,
    backgroundColor: COLORS.red,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
