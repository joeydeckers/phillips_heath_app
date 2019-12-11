import React from 'react';
import { Text, AsyncStorage, ActivityIndicator, StatusBar, StyleSheet, View, Linking, Image} from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/Feather';


import Login from './views/Login'
import DoctorProfile from './views/DoctorProfile'
import Chat from './views/Chat'
import AddNutrtion from './views/AddNutrition'
import Settings from './views/Settings'
import NutritionLog from './views/NutritionLog'
import store from './src/store'
import {Provider} from 'react-redux'

class AuthLoadingScreen extends React.Component {

async getToken() {
  try {
    let userToken = await AsyncStorage.getItem("userToken");
    if(JSON.parse(userToken)){
      this.props.navigation.navigate('App');
    }
    else{
      this.props.navigation.navigate('Login');
    }
  } catch (error) {
    this.props.navigation.navigate('Login');
  }
}

componentDidMount() {
  this.getToken();
}

  render() {
      return (
        <View style={{
          flex: 1, 
          alignItems: 'center',
          justifyContent: 'center'
      }}>
        <StatusBar backgroundColor="white" barStyle="dark-content" translucent={false}/>
          <Text style={{color: '#000',
          fontSize: 18,
          fontFamily: 'Iowan Old Style',
          fontWeight: 'bold'}}>Welcome at.
          </Text>
          <Text style={{color: '#000',
          fontSize: 50,
          fontFamily: 'Iowan Old Style',
          fontWeight: 'bold'}}>Doctor Phillips
          </Text>
          <ActivityIndicator  size="large" color="#000"/>
      </View>
      );
    }}


    const Stack1 = createStackNavigator({
      Home: {
        screen: NutritionLog
      },
      DoctorProfile: {
       screen: DoctorProfile
      }
     
    });
    
    
    
    const Stack2 = createStackNavigator({
      AddNutrtion: {
        screen: AddNutrtion
      },
      
    });
    
    const Stack3 = createStackNavigator({
      Chat: {
        screen: Chat
      }
    });
    
    const Stack4 = createStackNavigator({
      MainUserSettings: {
        screen: Settings
      }
    });
    
    
    const bottomNav = createBottomTabNavigator(
      {
        Home: {
          screen: Stack1,
          
          navigationOptions: () => ({
              tabBarIcon: ({tintColor}) => (
                <Icon
                      name="clipboard"
                      color={tintColor}
                      size={30}
                  />
              )
              
          })
        },
        Add:{
          // screen: () => null, // Empty screen
          // navigationOptions: () => ({
          //     tabBarIcon: <AddButton /> // Plus button component
          // })
          screen: Stack2,
          navigationOptions: () => ({
              tabBarIcon: ({tintColor}) => (
                <Icon
                name="plus"
                color={tintColor}
                size={30}
            />
              )
          })
      },
        Chat: {
          screen: Stack3,
          navigationOptions: () => ({
              tabBarIcon: ({tintColor}) => (
                  <Icon
                      name="message-circle"
                      color={tintColor}
                      size={30}
                  />
              )
          })
        },
        Settings: {
          screen: Stack4,
          navigationOptions: () => ({
              tabBarIcon: ({tintColor}) => (
                  <Icon
                      name="user"
                      color={tintColor}
                      size={30}
                  />
              )
          })
        },
      },
     {
      
    
        tabBarOptions: {
            lazyLoad: true,
            swipeEnabled: true,
                animationEnabled: true,
            activeTintColor: '#000', 
            lazy:true,
            showLabel: false, // hide labels
            activeTintColor: '#000', // active icon color
            inactiveTintColor: '#616161',  // inactive icon color
            style: {
                backgroundColor: '#fff', // TabBar background
                
              },
              tabStyle: {
                height: 48
            },
            
        }
    });
    
    
    
    const AuthStack = createStackNavigator({ Login: Login });
    
    
    const App = createSwitchNavigator({
      AuthLoading: AuthLoadingScreen,
      Login: {
        screen: AuthStack,
      },
      App: {
        screen: bottomNav,
      },
    });
    
    const AppContainer = createAppContainer(App);

    const Appp = () => {
      return (
       <Provider store={store}>
         <AppContainer/>
        </Provider>
      );
    };
    
    export default Appp;
   
