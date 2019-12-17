import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView,AsyncStorage,Button} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import axios from 'axios';

export default class Login extends Component{

    removeToken = async () => {
        const userToken = await AsyncStorage.removeItem('userToken');
        this.props.navigation.navigate('Login');
      };

      state = {
        email: '',
        name: '',
        insulinsensitivity: ''
    }

        getUserInfo = async () => {
            const userToken = await AsyncStorage.getItem('userToken');
            axios.get('http://hypefash.com/public/api/v1/client/info?sid=' + JSON.parse(userToken))
            .then((response) => {
                this.setState({
                    email:response.data.email || "Geen email",
                    name: response.data.name || "Geen naam",
                    insulinsensitivity: response.data.insulinsensitivity || "Insulinewaarde niet ingevuld"
                })
            })
            .catch((error) => {
                alert(error)
            })
        }

        componentDidMount(){
            this.getUserInfo();
        } 

    render(){
        return(
            <ScrollView style = {styles.container}>  
                <Text style ={styles.settingsHeader}><Text style ={styles.passwordIcon}><Icon name="settings" size={42} color="#000" /></Text> Instellingen</Text>  
                
                <View style = {styles.containerAccountSettings} >
{/*                  
                    <View style = {styles.containerButton}>                     
                        <TouchableOpacity style = {styles.buttonText}>
                        <Text style ={styles.passwordIcon}><Icon name="shield" size={42} color="#000" /></Text>
                        <Text style ={styles.passwordButtonText}>Verander wachtwoord</Text>
                        </TouchableOpacity> 
                    </View> 
                    <View style = {styles.containerButton}>                     
                        <TouchableOpacity style = {styles.buttonText}>
                        <Text style ={styles.passwordIcon}><Icon name="bell" size={42} color="#000" /></Text>
                        <Text style ={styles.passwordButtonText}>Meldingen</Text>
                        </TouchableOpacity> 
                    </View> 
                    <View style = {styles.containerButton}>                     
                        <TouchableOpacity style = {styles.buttonText}>
                        <Text style ={styles.passwordIcon}><Icon name="lock" size={42} color="#000" /></Text>
                        <Text style ={styles.passwordButtonText}>Privacy instellingen</Text>
                        </TouchableOpacity> 
                    </View>  */}
                    <View style = {styles.containerButton}>                     
                        <Text style ={styles.passwordButtonText}>Email: {this.state.email}</Text>
                        <Text style ={styles.passwordButtonText}>Bloedwaarde: {this.state.insulinsensitivity}</Text>
                        <Text style ={styles.passwordButtonText}>Naam: {this.state.name}</Text>

                    </View>
                    <View style = {styles.containerButton}>                     
                        <TouchableOpacity style = {styles.buttonText} onPress = {this.removeToken}>
                        <Text style ={styles.passwordIcon}><Icon name="log-out" size={42} color="#000" /></Text>
                        <Text style ={styles.passwordButtonText}>Uitloggen</Text>
                        </TouchableOpacity> 
                    </View> 
                </View> 
                   
                 
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container:{       
        
    },  

    containerAccountSettings:{
        padding: 20,
        

    },
    containerPasswordSettings:{
        flexDirection:"row",
        

    },
    settingsHeader:{
        fontSize: 36,
        marginTop: 30,
        marginLeft: 30,
        fontWeight:'bold',
        
    },
    
    passwordButtonText:{
        fontSize: 16,
        marginLeft: 10,
        marginTop: 18,
        
    },
    passwordIcon:{
        marginTop: 8,
        marginRight: 8,
        
    },

    containerButton:{
        marginTop: 10,
        
    },

    

    settingsCatogory:{
        fontSize: 22,
        marginLeft: 30,
        marginTop: 15,
        fontWeight:'bold',
        
        
    },
    buttonText:{
        fontSize: 24,
        marginLeft: 10, 
        flexDirection:"row", 
         
     },

     iconImage:{
        height:40,
        width:40,
        borderRadius:15,
        
     },
          
    
});
