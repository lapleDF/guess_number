import {Button, FlatList, Image, StyleSheet, View} from 'react-native';
import React from 'react';
import CSText from '../components/core/CSText';

const Instruction = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={[...Array(12)]}
        renderItem={({index}) => (
          <Image
            source={{
              uri: 'https://imgs.search.brave.com/wZZTC4Y7s1C8ZCJOvCXeQJbDEHZq52mmjEdwpPV_3VQ/rs:fit:1200:1200:1/g:ce/aHR0cDovL2xpdmVk/YW4zMzAuY29tL3dw/LWNvbnRlbnQvdXBs/b2Fkcy9EU0NfMTE1/MS5qcGc',
            }}
            style={styles.image}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default Instruction;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 200,
  },
});
