import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const CommonHeader = ({customCommonHeaderstyle, children}) => {
  return (
    <View
      style={[
        styles.headerWrapper,
        customCommonHeaderstyle && customCommonHeaderstyle,
      ]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
  },
});

export default CommonHeader;
