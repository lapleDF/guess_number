import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import RBSheet from 'react-native-raw-bottom-sheet';

import {COLORS} from '../../constants/color.constant';
import {SPACING} from '../../constants/spacing.constant';

interface CSModalProps {
  refRBSheet: any;
  height?: any;
  closeBtn?: boolean;
  children?: any;
  style?: any;
}

const CSModal = (props: CSModalProps) => {
  const {refRBSheet, height = 'auto', closeBtn = true, children, style} = props;
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
          width: SPACING.width - SPACING.px * 2,
          position: 'absolute',
          shadowColor: COLORS.black,
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.27,
          shadowRadius: 4.65,

          elevation: 6,
          ...style,
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
      <View style={styles.container}>{children}</View>
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
    gap: 10,
  },
});

export default CSModal;
