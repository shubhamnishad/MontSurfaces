import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

const CustomCard = ({children, customStyles}) => {
  return (
    <View style={[styles.cardContainer, customStyles && {...customStyles}]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    margin: 15,
    borderRadius: 20,
    flex: 1,
    width: '90%',
    backgroundColor: '#fff',
  },
});

export default CustomCard;
