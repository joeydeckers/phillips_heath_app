import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView,Image,Button} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export default class Login extends Component{
    render(){
        return(
            <ScrollView style = {styles.container}>
                <Text style = {styles.TextHeader}>Verander uw wachtwoord</Text>
                <View style = {styles.InputContainer}>
                    <TextInput secureTextEntry={true} style = {styles.WachtwoordContainer} placeholder = " Uw oude wachtwoord"/>
                    <TextInput secureTextEntry={true} style = {styles.WachtwoordContainer} placeholder = " Uw Nieuwe wachtwoord"/>
                    <TextInput secureTextEntry={true} style = {styles.WachtwoordContainer} placeholder = " Herhaal uw nieuwe wachtwoord"/>
                </View>
                <TouchableOpacity>
                    <Text style ={styles.speakButton}>Verander</Text>
                    </TouchableOpacity>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        
        
    },
    TextHeader:{
        fontSize: 32,
        marginTop: 25,
        marginLeft: 30,
        fontWeight:'bold',
        marginBottom:20,
        
        
    },

    WachtwoordContainer:{
        
        borderRadius: 8,
        width: 342,
        marginLeft:25,
        marginTop:15,
        backgroundColor:'#EFEFF4',
        paddingLeft:13,
        
        
    },

    InputContainer:{
        
        
        
    },
    speakButton:{
        fontWeight:'bold',
        padding:10,
        textAlign :"center",  
        color:"white"      ,
        backgroundColor:'#4486FF',
        borderRadius:8,
        margin: 25,
        marginTop: 30,
        marginBottom: 10,
        height:40,
    },
    
});
