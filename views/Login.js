import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import axios from 'axios'

export default class Login extends Component{

    state = {
        username: 'jaap@jaap.nl',
        password: 'hoi123',
        loginSuccess: false
    }


    userNameHandler = val =>{
        this.setState({
            username: val
        })
    }

    userPasswordHandler = val =>{
        this.setState({
            password: val
        })
    }

  

    loginUser = () =>{
        axios.post('http://hypefash.com/public/api/v1/client/login',{
            email: this.state.username,
            password: this.state.password
        })
        .then((response)=>{
            alert(response.data.success);
            this.setState({loginSuccess:response.data.success})
        })
        .catch((error)=>{
            alert(error);
        })
        return this.state.loginSuccess;
    }

    render(){
        return(
            <View style = {styles.container}>
                <Text style = {styles.headingTitle}>Welkom bij het platform</Text>
                <TextInput 
                    style = {styles.textInput} 
                    placeholder = "Uw gebruikersnaam"
                    value = {this.state.username}
                    onChangeText = {this.userNameHandler}
                    autoCapitalize = 'none'
                />
                <TextInput 
                    style = {styles.textInput}
                    placeholder = "Uw wachtwoord"
                    value = {this.state.password}
                    onChangeText = {this.userPasswordHandler}
                    autoCapitalize = 'none'
                />
                <TouchableOpacity style = {styles.button} onPress = {this.loginUser}>
                    <Text style = {styles.buttonText}>Inloggen</Text>
                </TouchableOpacity>
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        marginTop: 40,
        padding: 25
    },
    headingTitle:{
        fontSize: 35,
        fontWeight: 'bold'
    },
    textInput:{
        padding: 13,
        marginTop: 10,
        backgroundColor: '#EFEFF4',
        borderRadius: 8
    },
    button:{
        marginTop: 15,
        backgroundColor: '#4486FF',
        padding: 13,
        borderRadius: 8
    },
    buttonText:{
        color: '#fff',
        textAlign: 'center'
    }
});
