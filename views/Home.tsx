import {ImageBackground, StyleSheet, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {CONST_IMAGE} from '../src/utils/image.constant';
import CSText from '../src/components/core/CSText';
import Table from '../src/components/home/Table';
import InputControl from '../src/components/home/InputControl';
import {useSelector} from 'react-redux';
import {GuessListType, initialGuessList} from '../src/@type/GuessListType';
import store, {RootState} from '../src/store/store';
import {RoundListType} from '../src/@type/RoundListType';
import {COLORS} from '../src/utils/color.constant';
import CSModal from '../src/components/core/CSModal';
import CSButton from '../src/components/core/CSButton';
import {ROUND_ACTION} from '../src/store/actions/roundAction.constant';
import {RoundType, initialRound} from '../src/@type/RoundType';
import uuid from 'react-uuid';
import {getRandomNumbers} from '../src/shared/getRandomNumber';

const Home = () => {
  const refModal = useRef<any>(null);
  const [message, setMessage] = useState<string>('');
  const rounds: RoundListType = useSelector((state: RootState) => state.rounds);
  const guesses: GuessListType = useSelector(
    (state: RootState) => state.guesses,
  );
  console.log(
    'CCCCCCC',
    rounds.roundList[rounds.roundList.length - 1].expectedNumber.join(''),
  );

  useEffect(() => {
    const checkRound = () => {
      if (rounds.roundList[rounds.roundList.length - 1].result) {
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
    let round: RoundType = initialRound;
    round.id = uuid();
    round.expectedNumber = getRandomNumbers(4);
    round.guessList.guessList = [];
    round.result = false;
    store.dispatch({type: ROUND_ACTION.newGame, payload: round});
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
      <CSText size="xxl" bold="bold" color="primary">
        Guess number
      </CSText>
      <View style={styles.results}>
        {rounds.roundList[rounds.roundList.length - 1].expectedNumber.map(
          item => (
            <CSText
              size="lg"
              bold={700}
              key={item}
              style={[
                styles.resultNUmber,
                {
                  backgroundColor: rounds.roundList[rounds.roundList.length - 1]
                    .result
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
});
