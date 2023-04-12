import {ImageBackground, StyleSheet} from 'react-native';
import React from 'react';
import {CONST_IMAGE} from '../src/utils/image.constant';
import CSText from '../src/components/CSText';

const Home = () => {
  return (
    <ImageBackground source={CONST_IMAGE.BG} style={styles.container}>
      <CSText size="xxl" bold="bold" color="primary">
        Guess number
      </CSText>
    </ImageBackground>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});
