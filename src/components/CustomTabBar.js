import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

const CustomTabBar = ({data, selectedTabData, selectedTabIndex}) => {
  const [selectedTab, setSelectedTab] = useState(0);
  console.log('CT', selectedTabIndex);
  const renderTab = number => {
    setSelectedTab(number);
    selectedTabData(number);
  };

  return (
    <View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={styles.tabScrollWrapper}>
          {data.map((item, index) => {
            return (
              <View
                key={index}
                style={[
                  styles.tabContentWrapper,
                  {
                    borderBottomColor:
                      selectedTabIndex === index ? '#000' : 'lightgrey',
                    borderBottomWidth: selectedTabIndex === index ? 2 : 0,
                  },
                ]}>
                <TouchableOpacity onPress={() => renderTab(index)}>
                  <Text style={{marginTop: 10}}>{item.name}</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  tabScrollWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
    alignSelf: 'center',
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
  },
  tabContentWrapper: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 130,
  },
});

export default CustomTabBar;
