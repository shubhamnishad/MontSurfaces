import * as React from 'react';
import {TextInput, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const SearchBarComponent = ({
  onChange,
  searchQuery,
  icon,
  color,
  placeholder,
  customSearchIconStyle,
}) => {
  return (
    <View style={styles.container}>
      <View style={{width: '90%'}}>
        <TextInput
          placeholder={placeholder ? placeholder : 'Search'}
          onChangeText={onChange}
          value={searchQuery}
        />
      </View>
      <View
        style={[
          styles.searchStyle,
          customSearchIconStyle && customSearchIconStyle,
        ]}>
        <Icon
          name={icon ? icon : 'search'}
          size={25}
          color={color ? color : '#28A8BB'}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'lightgrey',
    backgroundColor: '#fff',
    flexDirection: 'row',
  },
  searchStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export {SearchBarComponent};
