// App.js
import React from 'react';
import { StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import TitleScreen    from './screens/TitleScreen.js';
import HomeScreen     from './screens/HomeScreen.js';
import AnalysisScreen from './screens/AnalysisScreen.js';
import HistoryScreen  from './screens/HistoryScreen.js';
import ProfileScreen  from './screens/ProfileScreen.js';

const Tab = createBottomTabNavigator();
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home')     iconName = 'home';
          else if (route.name === 'Analysis') iconName = 'analytics';
          else if (route.name === 'History')  iconName = 'time';
          else if (route.name === 'Profile')  iconName = 'person';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarStyle: { backgroundColor: '#0C1C2C' },
        tabBarActiveTintColor:   '#5DFDCB',
        tabBarInactiveTintColor: '#ccc',
        headerShown: false
      })}
    >
      <Tab.Screen name="Home"     component={HomeScreen} />
      <Tab.Screen name="Analysis" component={AnalysisScreen} />
      <Tab.Screen name="History"  component={HistoryScreen} />
      <Tab.Screen name="Profile"  component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#0C1C2C" />

      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Title" component={TitleScreen} />
        <Stack.Screen name="Main"  component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
