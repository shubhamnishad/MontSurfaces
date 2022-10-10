import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  PermissionsAndroid,
  FlatList,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Contacts from 'react-native-contacts';
import CustomTabBar from '../components/CustomTabBar';
import ContactList from './ContactList';
import {SearchBarComponent} from '../components/SearchBarComponent';
import {useDispatch, useSelector} from 'react-redux';
import {SEARCH_PLANS, RESET_ARRAY, SEARCH_BY_SPEED} from '../redux/Action';
import MoneySaver from './MoneySaver';
import Recommended from './Recommended';
import Basic from './Basic';
import Entertainment from './Entertainment';
import CustomChip from '../components/CustomChip';
import CommonHeader from '../components/CommonHeader';

const TabArray = [
  {id: 1, name: 'money saver'},
  {id: 2, name: 'entertainment'},
  {id: 3, name: 'basic'},
  {id: 4, name: 'recommended'},
];

const Home = props => {
  const [selectedContact, setSelectedContact] = useState();
  const [openContactList, setOpenContactList] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [enableFilter, setEnableFilter] = useState(false);
  const dispatch = useDispatch();
  const plan = useSelector(state => state.infoReducer.plans);
  const filterPlan = useSelector(state => state.infoReducer.filterd_array);

  const onChangeSearch = query => {
    setSearchQuery(query);

    if (searchQuery.length > 0) {
      dispatch({
        type: SEARCH_PLANS,
        payload: {
          searchQuery: query,
        },
      });
    }
  };

  const selectedTabData = e => {
    setSelectedTabIndex(e);
  };

  const renderContacts = async () => {
    try {
      const andoidContactPermission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          title: 'Contacts Permission',
          message: 'This app would like to view your contacts.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (andoidContactPermission === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Contacts Permission granted');
        Contacts.getAll().then(contacts => {
          setContacts(contacts);
          setOpenContactList(true);
        });
      } else {
        console.log('Contacts permission denied');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const renderSelectedContact = c => {
    setOpenContactList(false);
    setSelectedContact(c);
  };

  const keyExtractor = (item, idx) => {
    return item?.recordID?.toString() || idx.toString();
  };
  const renderItem = ({item, index}) => {
    return (
      <ContactList
        contact={item}
        renderSelectedContact={renderSelectedContact}
      />
    );
  };

  const renderSpeed = e => {
    dispatch({
      type: SEARCH_BY_SPEED,
      payload: {
        speed: e,
      },
    });
  };

  const renderCancelSpeed = async () => {
    setEnableFilter(false);
    await dispatch({
      type: RESET_ARRAY,
      payload: {
        reset: [],
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <CommonHeader
        customCommonHeaderstyle={{
          justifyContent: 'space-around',
        }}>
        <View style={styles.circleWrapper}>
          <Icon name="arrow-left" size={20} color="#fff" />
        </View>
        <View style={styles.headerTitle}>
          <Text style={styles.headerTitleText}>recharge</Text>
        </View>
        <View style={styles.circleWrapper}>
          <Icon name="question" size={20} color="#fff" />
        </View>
      </CommonHeader>
      <TouchableWithoutFeedback onPress={() => renderContacts()}>
        <View style={styles.contactWrapper}>
          <View style={styles.number}>
            <Text style={styles.contactColor}>{selectedContact}</Text>
          </View>
          <View style={styles.contact}>
            <Icon
              name="address-book"
              size={30}
              color="rgba(255, 255, 255, .9)"
            />
          </View>
        </View>
      </TouchableWithoutFeedback>

      <View style={styles.contentContainer}>
        {openContactList ? (
          <FlatList
            data={contacts}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            style={styles.list}
          />
        ) : enableFilter ? (
          <View>
            <View style={styles.searchContainer}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                <View style={styles.crossIconStyle}>
                  <Icon
                    name="window-close"
                    size={40}
                    color="#03A9F4"
                    onPress={() => renderCancelSpeed()}
                  />
                </View>
                {plan.map((item, index) => {
                  return (
                    <View style={styles.chipWrapper} key={index}>
                      <CustomChip data={item} renderSpeed={renderSpeed} />
                    </View>
                  );
                })}
              </ScrollView>
            </View>
          </View>
        ) : (
          <View style={styles.searchContainer}>
            <View style={styles.searchStyle}>
              <SearchBarComponent
                onChange={onChangeSearch}
                searchQuery={searchQuery}
              />
            </View>
            <View style={styles.filterStyle}>
              <Icon
                name="filter"
                size={30}
                color="#28A8BB"
                onPress={() => setEnableFilter(true)}
              />
            </View>
          </View>
        )}

        {!openContactList && (
          <>
            {!enableFilter && (
              <CustomTabBar
                data={TabArray}
                selectedTabData={selectedTabData}
                selectedTabIndex={selectedTabIndex}
              />
            )}

            {selectedTabIndex === 0 ? (
              <MoneySaver
                data={filterPlan?.length > 0 ? filterPlan : plan}
                navigation={props.navigation}
                selectedTabData={selectedTabData}
              />
            ) : selectedTabIndex === 1 ? (
              <Entertainment
                data={filterPlan?.length > 0 ? filterPlan : plan}
                navigation={props.navigation}
                selectedTabData={selectedTabData}
              />
            ) : selectedTabIndex === 2 ? (
              <Basic
                data={filterPlan?.length > 0 ? filterPlan : plan}
                navigation={props.navigation}
                selectedTabData={selectedTabData}
              />
            ) : (
              <Recommended
                data={filterPlan?.length > 0 ? filterPlan : plan}
                navigation={props.navigation}
                selectedTabData={selectedTabData}
              />
            )}
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  contactWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    height: 60,
    backgroundColor: '#525252',
  },
  number: {
    width: '90%',
    paddingLeft: 20,
  },
  contactColor: {
    color: 'rgba(255, 255, 255, .9)',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#EFECF3',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  list: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  searchStyle: {
    width: '80%',
  },
  filterStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: 50,
    height: 50,
    borderRadius: 4,
  },
  crossIconStyle: {
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chipWrapper: {
    flexDirection: 'row',
  },
  headerTitle: {
    width: '70%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitleText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
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
});
