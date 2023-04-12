import {ImageBackground, StyleSheet} from 'react-native';
import React from 'react';
import {CONST_IMAGE} from '../src/utils/image.constant';
import CSText from '../src/components/core/CSText';
import Table from '../src/components/home/Table';
import InputControl from '../src/components/home/InputControl';

const Home = () => {
  const min = 1;
  const max = 9;
  const numNumbers = 4;

  const randomNumbers = [];

  for (let i = 0; i < numNumbers; i++) {
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    randomNumbers.push(randomNumber);
  }

  console.log(randomNumbers);
  return (
    <ImageBackground source={CONST_IMAGE.BG} style={styles.container}>
      <CSText size="xxl" bold="bold" color="primary">
        Guess number
      </CSText>
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
});
