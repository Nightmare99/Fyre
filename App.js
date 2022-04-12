/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  Heading
} from 'native-base';
const Stack = createNativeStackNavigator();
import HomeScreen from './src/screens/HomeScreen';
import ScanScreen from './src/screens/ScanScreen';
import StatusScreen from './src/screens/StatusScreen';

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          screenOptions={{
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
          options={{ 
            title: 'FYRE',
          }}
        />
        <Stack.Screen
          name="Scanner"
          component={ScanScreen}
        />
        <Stack.Screen
          name="Status"
          component={StatusScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
