import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import uuid from 'react-uuid';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import IconOcticons from 'react-native-vector-icons/Octicons';

import CSText from '../components/core/CSText';
import Table from '../components/home/Table';
import InputControl from '../components/home/InputControl';
import {GuessListType} from '../interface/GuessListType';
import {RootState, appDispatch} from '../store/store';
import {RoundListType} from '../interface/RoundListType';
import {COLORS} from '../constants/color.constant';
import {CONST_IMAGE} from '../constants/image.constant';
import CSModal from '../components/core/CSModal';
import CSButton from '../components/core/CSButton';
import {ROUND_ACTION} from '../store/actions/roundAction.constant';
import {RoundType} from '../interface/RoundType';
import {getRandomNumbers} from '../utils/getRandomNumber';

export const initialRound: RoundType = {
  id: uuid(),
  guessList: [],
  numNumber: 4,
  expectedNumber: getRandomNumbers(4),
  result: false,
};

const Home = () => {
  const rounds: RoundListType = useSelector((state: RootState) => state.rounds);
  const guesses: GuessListType = useSelector(
    (state: RootState) => state.guesses,
  );
  const navigation = useNavigation<any>();
  const refModal = useRef<any>(null);
  const [message, setMessage] = useState<string>('');
  const [newRoundValue, setNewRoundValue] = useState<RoundType>(initialRound);
  const [numNumber, setNumNumber] = useState<number>(
    rounds.roundList[rounds.roundList.length - 1]?.numNumber || 4,
  );
  const [isDisplaySelection, setIsDisplaySelection] = useState<boolean>(false);

  useEffect(() => {
    appDispatch(ROUND_ACTION.NEW_GAME, newRoundValue);
  }, [newRoundValue]);

  useEffect(() => {
    const checkRound = () => {
      if (rounds.roundList[rounds.roundList.length - 1]?.result) {
        setMessage('Congratulations on completing the challenge!');
        refModal.current.open();
        return;
      }
      if (guesses.guessList.length === 10) {
        setMessage('Your have run out of guesses!');
        refModal.current.open();
        return;
      }
    };
    checkRound();
  }, [guesses, rounds]);

  const handleNewGame = () => {
    refModal.current.close();
    setNewRoundValue({
      ...newRoundValue,
      id: uuid(),
      expectedNumber: getRandomNumbers(numNumber),
      numNumber: numNumber,
      guessList: [],
      result: false,
    });
  };

  const handleSelectLevel = () => {
    setIsDisplaySelection(!isDisplaySelection);
  };

  const handleChooseLevel = (level: number) => {
    if (level === numNumber) {
      setIsDisplaySelection(!isDisplaySelection);
      return;
    }
    appDispatch(ROUND_ACTION.SET_LEVEL, level);
    setNumNumber(level);
    setIsDisplaySelection(!isDisplaySelection);
  };

  return (
    <ImageBackground source={CONST_IMAGE.BG} style={styles.container}>
      <CSModal refRBSheet={refModal}>
        <CSText size="lg" color="primary">
          Finished!
        </CSText>
        <CSText color="primary">{message}</CSText>
        <CSButton onPress={handleNewGame} title="New game" />
      </CSModal>
      <TouchableOpacity
        onPress={() => navigation.openDrawer()}
        style={styles.btnSettings}>
        <IconOcticons name="multi-select" size={23} color={COLORS.white} />
      </TouchableOpacity>
      <View style={styles.btnSelectLevelwrapper}>
        <TouchableOpacity
          onPress={handleSelectLevel}
          style={styles.btnSelectLevel}>
          <CSText>{numNumber}</CSText>
          <IconOcticons name="single-select" size={23} color={COLORS.white} />
        </TouchableOpacity>
        <View
          style={[
            styles.selection,
            // eslint-disable-next-line react-native/no-inline-styles
            {display: isDisplaySelection ? 'flex' : 'none'},
          ]}>
          {[...Array(4)].map((_, index) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  handleChooseLevel(index + 3);
                }}
                style={styles.selectionItem}
                key={index}>
                <CSText>{index + 3}</CSText>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      <CSText size="xxl" color="primary">
        Guess number
      </CSText>
      <View style={styles.results}>
        {rounds.roundList.length > 0 &&
          rounds.roundList[rounds.roundList.length - 1].expectedNumber.map(
            item => (
              <CSText
                size="lg"
                key={item}
                style={[
                  styles.resultNUmber,
                  {
                    backgroundColor:
                      rounds.roundList[rounds.roundList.length - 1].result ||
                      guesses.guessList.length === 10
                        ? COLORS.transparent
                        : COLORS.white,
                  },
                ]}>
                {item}
              </CSText>
            ),
          )}
      </View>
      <Table />
      <InputControl />
    </ImageBackground>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    resizeMode: 'cover',
    paddingVertical: 20,
  },
  resultNUmber: {
    letterSpacing: 15,
    fontWeight: '700',
  },
  results: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    gap: 10,
  },
  btnSettings: {
    position: 'absolute',
    backgroundColor: COLORS.grey,
    borderRadius: 6,
    top: 10,
    left: 10,
    zIndex: 2,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  btnSelectLevelwrapper: {
    position: 'absolute',
    backgroundColor: COLORS.grey,
    borderRadius: 6,
    top: 10,
    right: 10,
    zIndex: 2,
  },
  btnSelectLevel: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 6,
  },
  selection: {
    gap: 10,
    backgroundColor: COLORS.grey,
    zIndex: 2,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
  selectionItem: {
    borderBottomColor: COLORS.overlay,
    borderBottomWidth: 0.5,
  },
});
