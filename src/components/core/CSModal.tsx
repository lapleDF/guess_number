import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import RBSheet from 'react-native-raw-bottom-sheet';
import {COLORS} from '../../utils/color.constant';

interface CSModalProps {
  refRBSheet: any;
  height?: any;
  closeBtn?: boolean;
  children?: any;
  style?: any;
}

const CSModal = (props: CSModalProps) => {
  const {refRBSheet, height = 500, closeBtn = true} = props;
  return (
    <RBSheet
      ref={refRBSheet}
      closeOnDragDown={false}
      animationType="slide"
      customStyles={{
        container: {
          justifyContent: 'flex-start',
          alignItems: 'center',
          height: height,
          borderRadius: 15,
          width: Dimensions.get('screen').width - 20,
          position: 'absolute',
          shadowColor: COLORS.black,
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.27,
          shadowRadius: 4.65,

          elevation: 6,
          ...props.style,
        },
        draggableIcon: {
          backgroundColor: COLORS.secondary,
        },
        wrapper: {
          justifyContent: 'center',
          alignItems: 'center',
        },
      }}>
      {closeBtn && (
        <TouchableOpacity
          onPress={() => refRBSheet.current.close()}
          style={styles.closeBtn}>
          <Icon name="x" size={26} color={COLORS.red} />
        </TouchableOpacity>
      )}
      <View style={styles.container}>{props.children}</View>
    </RBSheet>
  );
};

const styles = StyleSheet.create({
  closeBtn: {
    position: 'absolute',
    top: 15,
    right: 15,
    zIndex: 10,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
});

export default CSModal;
