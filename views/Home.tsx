import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {CONST_IMAGE} from '../src/utils/image.constant';
import CSText from '../src/components/core/CSText';
import Table from '../src/components/home/Table';
import InputControl from '../src/components/home/InputControl';
import {useSelector} from 'react-redux';
import {GuessListType} from '../src/@type/GuessListType';
import store, {RootState} from '../src/store/store';
import {RoundListType} from '../src/@type/RoundListType';
import {COLORS} from '../src/utils/color.constant';
import CSModal from '../src/components/core/CSModal';
import CSButton from '../src/components/core/CSButton';
import {ROUND_ACTION} from '../src/store/actions/roundAction.constant';
import {RoundType, initialRound} from '../src/@type/RoundType';
import uuid from 'react-uuid';
import {getRandomNumbers} from '../src/shared/getRandomNumber';
import IconOcticons from 'react-native-vector-icons/Octicons';

const Home = () => {
  const refModal = useRef<any>(null);
  const [message, setMessage] = useState<string>('');
  const rounds: RoundListType = useSelector((state: RootState) => state.rounds);
  const guesses: GuessListType = useSelector(
    (state: RootState) => state.guesses,
  );
  const [newRoundValue, setNewRoundValue] = useState<RoundType>(initialRound);
  const [numNumber, setNumNumber] = useState<number>(
    rounds.roundList[rounds.roundList.length - 1]?.numNumber || 4,
  );
  const [isDisplaySelection, setIsDisplaySelection] = useState<boolean>(false);

  console.log(
    'result',
    rounds.roundList[rounds.roundList.length - 1]?.expectedNumber?.join(''),
  );

  useEffect(() => {
    store.dispatch({type: ROUND_ACTION.newGame, payload: newRoundValue});
  }, [newRoundValue]);

  useEffect(() => {
    const checkRound = () => {
      // if (rounds.roundList[rounds.roundList.length - 1]?.numNumber) {
      //   setNumNumber(rounds.roundList[rounds.roundList.length - 1].numNumber);
      // }
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
    console.log('CCCCreate new');
    refModal.current.close();
    let numGuessNumber = numNumber;
    setNewRoundValue({
      ...newRoundValue,
      id: uuid(),
      expectedNumber: getRandomNumbers(numGuessNumber),
      numNumber: numGuessNumber,
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
    store.dispatch({type: ROUND_ACTION.setLevel, payload: level});
    setNumNumber(level);
    setIsDisplaySelection(!isDisplaySelection);
  };

  return (
    <ImageBackground source={CONST_IMAGE.BG} style={styles.container}>
      <CSModal refRBSheet={refModal} height={'auto'}>
        <CSText size="lg" color="primary" bold={'bold'}>
          Finished!
        </CSText>
        <CSText color="primary">{message}</CSText>
        <CSButton onPress={handleNewGame} title="New game" />
      </CSModal>
      <TouchableOpacity onPress={() => {}} style={styles.btnSettings}>
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
            {display: isDisplaySelection ? 'flex' : 'none'},
          ]}>
          {[...Array(6)].map((_, index) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  handleChooseLevel(index + 1);
                }}
                style={styles.selectionItem}
                key={index}>
                <CSText>{index + 1}</CSText>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      <CSText size="xxl" bold="bold" color="primary">
        Guess number
      </CSText>
      <View style={styles.results}>
        {rounds.roundList.length > 0 &&
          rounds.roundList[rounds.roundList.length - 1].expectedNumber.map(
            item => (
              <CSText
                size="lg"
                bold={700}
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
