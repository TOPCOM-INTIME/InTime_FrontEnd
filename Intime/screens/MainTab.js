import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HomeStack from './HomeStack';
import PatternScreen from './PatternScreen';
import Map_Marker from './Map_Marker';
import ScheduleList from './ScheduleListScreen';
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
        component={ScheduleList}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="calendar-today" size={24} color={color} />
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
      <Tab.Screen
        name="지도"
        component={Map_Marker}
        options={{
          tabBarIcon: ({color}) => <Icon name="map" size={24} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

export default MainTab;
