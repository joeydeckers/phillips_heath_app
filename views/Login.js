import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';

export default class Login extends Component{
    render(){
        return(
            <View style = {styles.container}>
                <Text style = {styles.headingTitle}>Welkom bij het platform</Text>
                <TextInput placeholder = "Uw gebruikersnaam"/>
                <TextInput placeholder = "Uw wachtwoord"/>
                <TouchableOpacity>
                    <Text>Inloggen</Text>
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
        
    }
});
