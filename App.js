/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import {View, Text} from 'react-native';
import axios from 'axios'



import Login from './views/Login'
import DoctorProfile from './views/DoctorProfile'
import Chat from './views/Chat'
import AddNutrtion from './views/AddNutrition'
import NutritionLog from './views/NutritionLog'
import ReduxTest from './views/ReduxTest'
import Settings from './views/Settings'


import {createSwitchNavigator, createAppContainer, createBottomTabNavigator, createDrawerNavigator } from 'react-navigation'

//import {createStore} from 'redux'

import store from './src/store'
import {Provider} from 'react-redux'

const reducer = (state = initialState, action) => {
    switch(action.type){
      case 'LOGIN_USER':
        //alert(state.username);
        //alert(state.password);
          axios.post('http://hypefash.com/public/api/v1/client/login',{
            username: state.username,
            password: state.password
        })
        .then((response)=>{
            alert(response.data.sid);
            //this.setState({loginSuccess:response.data.success})
        })
        .catch((error)=>{
          alert(error);
        })
        return {}
      case 'GET_USER_USERNAME':
          return {...state, username: action.payload}
      case 'GET_USER_PASSWORD':
          return {...state, password: action.payload}
    }
    return state;
}


//const store = createStore(reducer);


const App = () => {
  return (
    <Provider store = {store}>
      <NutritionLog/>
    </Provider>
  );
};

// const AppSwitchNavigator = createSwitchNavigator({
//   Home: {screen:AddNutrtion},
// });

// // const AppDrawerNavigator = createDrawerNavigator({
// //   Home:{
// //     screen: AddNutrtion
// //   }
// // });

// const AppContainer = createAppContainer(AppSwitchNavigator);

// // const DashboardTabNavigator = createBottomTabNavigator({
// //   addNutrition
// // });



export default App;
