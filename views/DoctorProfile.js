import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView,Image} from 'react-native';

export default class Login extends Component{
    render(){
        return(
            <ScrollView style = {styles.container}>
                <View style = {styles.doctorInfoContainer}>             
                    <Image style = {styles.doctorImage}                   
                    source={require('./../Images/TestImage.png')}
                    />
                    <Text style ={styles.doctorTitle}> Dokter Meels </Text>
                </View> 
                
                
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        marginTop: 40,
        padding: 25
    },
    doctorTitle:{
        textAlign :"center",
        fontWeight : "bold",
        fontSize: 32,
    },    
    doctorImage:{
        height:150,
        width:150,
        borderRadius:150,
    },
    doctorInfoContainer:{
    justifyContent: 'center',
    alignItems:'center',

    }
        
    
});
