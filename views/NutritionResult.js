import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import axios from 'axios'

export default class Login extends Component{

    render(){
        return(
            <View style = {styles.container}>
                <Text>Waarde</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        marginTop: 40,
        padding: 25
    }
});
