import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import InfoScreen from './InfoScreen';
import PatternScreen from './PatternScreen';
import Map_Marker from './Map_Marker';
import ScheduleList from './ScheduleListScreen';
import ListScreen from './ListScreen';
import CommunityScreen from './CommunityScreen';

const Tab = createBottomTabNavigator();

function MainTab({friendInvite}) {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        // tabBarShowLabel: false,
        tabBarActiveTintColor: '#a2d2ff',
      }}>
      <Tab.Screen
        name="일정"
        component={ScheduleList}
        options={{
          tabBarIcon: ({color}) => <Icon name="home" size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="친구"
        HomeStack
        component={CommunityScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="people" size={24} color={color} />
          ),
          tabBarBadge: friendInvite > 0 ? friendInvite : null,
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
        name="리스트"
        component={ListScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="table-rows" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="내 정보"
        component={InfoScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="account-circle" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MainTab;
