import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';

import HomeScreen from './HomeScreen';
//import DetailsScreen from './DetailsScreen';
import AddRoutine from './AddRoutine';
import AddTask from './AddTask';
import UpdateRoutine from './UpdateRoutine';
import UpdateTask from './UpdateTask';

const Stack = createNativeStackNavigator();

export default function Todo() {
  return (
    <NavigationContainer>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#333"
        translucent={false}
      />
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        {/*<Stack.Screen name="Details" component={DetailsScreen} />*/}
        <Stack.Screen name="AddRoutine" component={AddRoutine} />
        <Stack.Screen name="AddTask" component={AddTask} />
        <Stack.Screen name="UpdateRoutine" component={UpdateRoutine} />
        <Stack.Screen name="UpdateTask" component={UpdateTask} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
