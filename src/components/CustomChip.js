import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {useSelector} from 'react-redux';

const CustomChip = ({data, renderSpeed}) => {
  const [selectedSpeed, setSelectedSpeed] = useState('');
  const filterPlan = useSelector(state => state.infoReducer.filterd_array);

  const renderChip = async speed => {
    await setSelectedSpeed(speed);
    await renderSpeed(speed);
  };

  let doesExist = filterPlan?.some(function (ele) {
    return ele.speed.toLowerCase() === selectedSpeed.toLowerCase();
  });

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        renderChip(data.speed);
      }}>
      <View
        style={[
          styles.container,
          doesExist ? styles.selectedChipColor : styles.unSelectedChipColor,
        ]}>
        <Text
          style={[
            doesExist ? styles.selectedTextColor : styles.unSelectedTextColor,
          ]}>
          {data.speed}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 120,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 19,
    marginHorizontal: 10,
  },
  selectedTextColor: {
    color: '#fff',
  },
  selectedChipColor: {
    backgroundColor: '#000',
  },
  unSelectedTextColor: {
    color: '#000',
  },
  unSelectedChipColor: {
    backgroundColor: '#fff',
  },
});

export default CustomChip;
