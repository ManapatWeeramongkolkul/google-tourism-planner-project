import React, { useState, Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigation from './navigation/TabNavigation';
import MainNavigation from './navigation/MainNavigation'
import 'react-native-gesture-handler';
import { NativeBaseProvider } from 'native-base';
import { LogBox } from 'react-native';

export default function App() {
  const Stack = createNativeStackNavigator();
  LogBox.ignoreAllLogs();
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="MainNavigation"
            component={MainNavigation}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}