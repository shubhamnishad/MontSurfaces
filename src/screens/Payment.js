import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
} from 'react-native';
import CustomCard from '../components/CustomCard';
import Icon from 'react-native-vector-icons/FontAwesome';
import {SearchBarComponent as PaymentInput} from '../components/SearchBarComponent';
import CommonHeader from '../components/CommonHeader';

const paymentArray = [
  {id: 0, name: 'UPI', enable: false},
  {id: 1, name: 'Wallet', enable: false},
  {id: 2, name: 'CREDIT/DEBIT/ATM Card', enable: false},
  {id: 3, name: 'Net Banking', enable: false},
];

const walletArray = [
  {id: 0, uri: require('../../assets/upi-icon.png'), name: 'paytm'},
  {id: 0, uri: require('../../assets/upi-icon.png'), name: 'phonepe'},
  {id: 0, uri: require('../../assets/upi-icon.png'), name: 'googlepe'},
];

const Payment = ({route, navigation}) => {
  const {amount} = route.params;
  console.log(amount);
  const [menu, setMenu] = useState(paymentArray);
  const [selectedKey, setSelectedKey] = useState(-1);
  const [state, setState] = useState(false);

  const result = menu.filter(object => {
    const values = Object.values(object);
    return values.includes(true);
  });

  useEffect(() => {
    renderMenu();
  }, [state, selectedKey]);

  const renderMenu = () => {
    const newArr = [...menu];
    for (let i = 0; i < menu.length; i++) {
      if (selectedKey == i) {
        newArr[i].enable = !menu[i].enable;
      } else {
        newArr[i].enable = false;
      }
    }
    setMenu(newArr);
  };

  const renderWallet = () => {
    return (
      <CustomCard customStyles={{padding: 5}}>
        <View style={[styles.rowWrapper]}>
          <View style={styles.row}>
            <Image
              style={styles.tinyLogo}
              source={require('../../assets/wallet.png')}
            />
            <Text>{result[0].name}</Text>
          </View>
          <Icon name="chevron-up" size={18} color="grey" />
        </View>
        {walletArray.map((item, index) => {
          return (
            <View style={styles.rowWalletContent}>
              <View style={styles.circle}></View>
              <Image style={styles.brandLogo} source={item.uri} />
              <Text>{item.name}</Text>
            </View>
          );
        })}
      </CustomCard>
    );
  };

  const renderUPI = () => {
    return (
      <CustomCard>
        <View style={styles.rowWrapper}>
          <Text>{result[0].name}</Text>
          <Icon name="chevron-up" size={18} color="grey" />
        </View>
        {walletArray.map((item, index) => {
          return (
            <View style={styles.rowWalletContent}>
              <View style={styles.circle}></View>
              <Image style={styles.brandLogo} source={item.uri} />
              <Text>{item.name}</Text>
            </View>
          );
        })}
      </CustomCard>
    );
  };

  const renderCard = () => {
    return (
      <CustomCard customStyles={{height: 200}}>
        <View style={styles.rowWrapper}>
          <Text>{result[0].name}</Text>
          <Icon name="chevron-up" size={18} color="grey" />
        </View>
        <View style={{margin: 15}}>
          <PaymentInput
            icon={'close'}
            color={'lightgrey'}
            placeholder={'card number'}
          />
        </View>
        <View style={styles.cardWrapper}>
          <View style={styles.cardDate}>
            <PaymentInput
              icon={'close'}
              color={'lightgrey'}
              placeholder={'valid thru (mm/yy)'}
            />
          </View>
          <View style={styles.cardCvv}>
            <PaymentInput
              icon={'close'}
              color={'lightgrey'}
              placeholder={'cvv'}
              customSearchIconStyle={{right: 20}}
            />
          </View>
        </View>
      </CustomCard>
    );
  };

  const renderNetBanking = () => {
    return (
      <CustomCard>
        <View style={styles.rowWrapper}>
          <Text>{result[0].name}</Text>
          <Icon name="chevron-up" size={18} color="grey" />
        </View>
        {walletArray.map((item, index) => {
          return (
            <View style={styles.rowWalletContent}>
              <View style={styles.circle}></View>
              <Image style={styles.brandLogo} source={item.uri} />
              <Text>{item.name}</Text>
            </View>
          );
        })}
      </CustomCard>
    );
  };
  return (
    <View style={styles.container}>
      <CommonHeader
        customCommonHeaderstyle={{
          justifyContent: 'space-around',
        }}>
        <View style={styles.circleWrapper}>
          <Icon
            name="arrow-left"
            size={20}
            color="#fff"
            onPress={() => navigation.goBack()}
          />
        </View>
        <View style={styles.headerTitle}>
          <Text style={styles.headerTitleText}>recharge</Text>
        </View>
      </CommonHeader>
      <View style={styles.contentContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <CustomCard customStyles={styles.paymentCard}>
            {menu.map((item, index) => {
              return (
                <>
                  {result[0]?.id === index ? (
                    <View key={index}></View>
                  ) : (
                    <View
                      key={index}
                      style={[
                        index !== paymentArray.length - 1 && styles.bottomLine,
                        {marginVertical: 10},
                      ]}>
                      <Pressable
                        onPress={() => {
                          setState(!state);
                          setSelectedKey(item.id);
                        }}>
                        <View style={styles.rowWrapper}>
                          <Text>{item.name}</Text>
                          <Icon name="chevron-down" size={18} color="grey" />
                        </View>
                      </Pressable>
                    </View>
                  )}
                </>
              );
            })}
          </CustomCard>

          {result && result.length > 0 ? (
            <Pressable
              onPress={() => {
                setState(!state);
                setSelectedKey(result[0].id);
              }}>
              {result[0].id === 0
                ? renderUPI()
                : result[0].id === 1
                ? renderWallet()
                : result[0].id === 2
                ? renderCard()
                : renderNetBanking()}
            </Pressable>
          ) : (
            <></>
          )}
        </ScrollView>
      </View>

      <View style={styles.footer}>
        <View style={styles.footerRowWrapper}>
          <View style={styles.finalPrice}>
            <Text style={styles.mainPlanStyle}>
              {'\u20B9'}
              {amount}
            </Text>
            <Text style={styles.priceText}>View Details</Text>
          </View>
          <View style={styles.payStyle}>
            <Text style={styles.payText}>Pay</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Payment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  contentContainer: {
    flex: 1, // pushes the footer to the end of the screen
    backgroundColor: '#ECF3F4',
  },
  footer: {
    height: 80,
    borderTopWidth: 1,
    borderTopColor: 'lightgrey',
    justifyContent: 'center',
  },
  paymentCard: {
    justifyContent: 'center',
  },
  rowWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: 45,
  },
  bottomLine: {
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
  },
  tinyLogo: {
    height: 30,
    width: 30,
    marginRight: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowWalletContent: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 20 / 2,
    borderWidth: 1,
    borderColor: '#000',
    marginHorizontal: 10,
  },
  brandLogo: {
    width: 24,
    height: 24,
    marginRight: 20,
  },
  footerRowWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  mainPlanStyle: {
    fontWeight: '600',
    color: '#000',
  },
  finalPrice: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  priceText: {
    color: 'blue',
  },
  payStyle: {
    width: 70,
    height: 40,
    borderRadius: 7,
    borderWidth: 1,
    backgroundColor: 'darkgrey',
    justifyContent: 'center',
    alignItems: 'center',
  },
  payText: {
    color: 'lighgrey',
    fontSize: 17,
  },
  cardWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  cardDate: {
    width: '60%',
  },
  cardCvv: {
    width: '20%',
  },
  circleWrapper: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    backgroundColor: 'grey',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -80,
  },
  headerTitleText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '800',
  },
});
