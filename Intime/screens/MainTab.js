import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HomeStack from './HomeStack';
import CalendarStack from './CalendarStack';
import PatternStack from './PatternStack';
import PatternScreen from './PatternScreen';

const Tab = createBottomTabNavigator();

function MainTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        // tabBarShowLabel: false,
        tabBarActiveTintColor: '#ee2f48',
      }}>
      <Tab.Screen
        name="알람"
        component={HomeStack}
        options={{
          tabBarIcon: ({color}) => <Icon name="home" size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="약속"
        component={CalendarStack}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="event" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="패턴"
        component={PatternScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="event" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MainTab;
