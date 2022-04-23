import React from 'react';
import { Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import { Home, Profile, OnBoarding, Library, Player } from '../../Screens';

const Stack = createStackNavigator();

const Stacks = ({ params }) => (
  <Stack.Navigator initialRouteName="OnBoarding">
    <Stack.Screen
      name="Home"
      component={Home}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="Profile"
      component={Profile}
      options={{
        headerShown: true,
      }}
    />
      <Stack.Screen
          name="OnBoarding"
          component={OnBoarding}
          options={{
              headerShown: false,
          }}
      />
      <Stack.Screen
          name="Library"
          component={Library}
          options={{
              headerShown: false,
          }}
      />
      <Stack.Screen
          name="Player"
          component={Player}
          options={{
              headerShown: false,
          }}
      />
  </Stack.Navigator>
);

export default Stacks;
