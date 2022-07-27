import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import AccountScreen from '../screens/AccountScreen';
import { AntDesign, FontAwesome5, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import ErrorHome from '../components/ErrorHome';
import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

const TabNavigation = () => {
  const Tab = createBottomTabNavigator();
  const { t } = useTranslation()
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarLabel: t("accountScreen.home"),
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-home-outline" size={24} color="black" />
          )
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={ErrorHome}
        options={{
          headerShown: false,
          tabBarLabel: t("accountScreen.favorites"),
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="favorite-outline" size={24} color="black" />
          )
        }}
      />

      <Tab.Screen
        name="Activities"
        component={ErrorHome}
        options={{
          headerShown: false,
          tabBarLabel: t("accountScreen.activities"),
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="tasks" size={24} color="black" />
          )
        }}
      />
      <Tab.Screen
        name="Messages"
        component={ErrorHome}
        options={{
          headerShown: false,
          tabBarLabel: t("accountScreen.messages"),
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="message-text-outline" size={24} color="black" />
          )
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          headerShown: false,
          tabBarLabel: t("accountScreen.account"),
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account-box" size={24} color="black" />
          )
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;

const styles = StyleSheet.create({
  title: {
    marginTop: 16,
    paddingVertical: 8,
    borderWidth: 4,
    borderColor: "#20232a",
    borderRadius: 6,
    backgroundColor: "#61dafb",
    color: "#20232a",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold"
  }
});