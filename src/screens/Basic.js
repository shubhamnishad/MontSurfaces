import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import CustomCard from '../components/CustomCard';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';

const MoneySaver = ({data, navigation, selectedTabData}) => {
  const filterPlan = useSelector(state => state.infoReducer.filterd_array);
  const length = filterPlan?.length;
  const renderNextTab = nativeEvent => {
    const end = Object.keys(nativeEvent).length;
    if (end > 0) {
      selectedTabData(3);
    }
  };

  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      onScroll={({nativeEvent}) => {
        if (isCloseToBottom(nativeEvent)) {
          renderNextTab(nativeEvent);
        }
      }}
      scrollEventThrottle={400}>
      {data?.map((item, index) => {
        return (
          <CustomCard
            key={index}
            customStyles={{
              height: length > 0 ? 200 : 140,
              borderWidth: length > 0 ? 1 : 0,
              borderColor:
                length > 0 ? ['#FC0FC0', '#8432DF', '#0B54FE'] : 'white',
            }}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Payment', {
                  amount: item.price,
                })
              }>
              <View
                style={[
                  styles.header,
                  filterPlan?.length > 0 && styles.selectedCardHeader,
                ]}>
                <View style={styles.headerContentWrapper}>
                  <Text style={styles.mainPlanStyle}>
                    {'\u20B9'}
                    {item.price}
                  </Text>
                  <Text>unlimited</Text>
                </View>
                <View style={styles.headerContentWrapper}>
                  <Text style={styles.mainPlanStyle}>{item.speed}</Text>
                  <Text>speed</Text>
                </View>
                <View style={styles.headerContentWrapper}>
                  <Text style={styles.mainPlanStyle}>{item.validity}</Text>
                  <Text>validity</Text>
                </View>
                <View style={styles.chevronCard}>
                  <Icon name="chevron-right" size={15} color="#03A9F4" />
                </View>
              </View>
              {filterPlan?.length > 0 ? (
                <View>
                  <View style={[styles.footer]}>
                    <View style={styles.footerContentWrapper}>
                      <Text>Image </Text>
                      <Text>Content</Text>
                    </View>
                    <View style={styles.footerContentWrapper}>
                      <Text style={styles.footerText}>View Details</Text>
                    </View>
                  </View>

                  <LinearGradient
                    start={{x: 0.1, y: 0.2}}
                    end={{x: 1, y: 0}}
                    colors={['#C020D0', '#8432DF', '#0B54FE']}
                    style={styles.gradientStyle}>
                    <View style={styles.gradientStyle}></View>
                  </LinearGradient>
                </View>
              ) : (
                <View style={[styles.footer]}>
                  <View style={styles.footerContentWrapper}>
                    <Text style={styles.blackText}>Image </Text>
                    <Text style={styles.blackText}>Content</Text>
                  </View>
                  <View style={styles.footerContentWrapper}>
                    <Text style={[styles.footerText, styles.blackText]}>
                      View Details
                    </Text>
                  </View>
                </View>
              )}
            </TouchableOpacity>
          </CustomCard>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    height: '60%',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  selectedCardHeader: {
    height: '50%',
  },

  footer: {
    flexDirection: 'row',
    height: '40%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  footerContentWrapper: {
    flexDirection: 'row',
    marginHorizontal: 20,
  },
  mainPlanStyle: {
    fontWeight: '600',
    color: '#000',
  },
  chevronCard: {
    top: -8,
  },
  footerText: {
    fontSize: 13,
  },
  gradientStyle: {
    height: 40,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  selectedBorderColor: {
    borderColor: '#blue',
  },
  blackText: {
    color: '#000',
  },
});

export default MoneySaver;
