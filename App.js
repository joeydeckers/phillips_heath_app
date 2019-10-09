/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import {View, Text} from 'react-native';
import Login from './views/Login'
import DoctorProfile from './views/DoctorProfile'
import Chat from './views/Chat'
import AddNutrtion from './views/AddNutrition'

import {createSwitchNavigator, createAppContainer, createBottomTabNavigator, createDrawerNavigator } from 'react-navigation'

const App = () => {
  return (
    <AppContainer/>
  );
};

const AppSwitchNavigator = createSwitchNavigator({
  Home: {screen:Chat},
});

const AppDrawerNavigator = createDrawerNavigator({
  Home:{
    screen: AddNutrtion
  }
});

const AppContainer = createAppContainer(AppSwitchNavigator);

// const DashboardTabNavigator = createBottomTabNavigator({
//   addNutrition
// });



export default App;
