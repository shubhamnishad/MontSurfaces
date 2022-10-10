import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Payment from '../screens/Payment';

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Payment" component={Payment} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
