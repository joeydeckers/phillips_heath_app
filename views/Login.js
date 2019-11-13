import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux'

class Login extends Component{
    render(){
        return(
            <View style = {styles.container}>
                <Text style = {styles.headingTitle}>Welkom bij het platform</Text>
                <TextInput 
                    style = {styles.textInput} 
                    placeholder = "Uw gebruikersnaam"
                    value = {this.props.username}
                    onChangeText = {this.props.setUsername}
                    autoCapitalize = 'none'
                />
                <TextInput 
                    style = {styles.textInput}
                    placeholder = "Uw wachtwoord"
                    value = {this.props.password}
                    onChangeText = {this.props.setUserPassword}
                    autoCapitalize = 'none'
                />
                <TouchableOpacity style = {styles.button} onPress = {() => this.props.loginUser()}>
                    <Text style = {styles.buttonText}>Inloggen</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity style = {styles.button} onPress = {this.loginUser}>
                    <Text style = {styles.buttonText}>Inloggen</Text>
                </TouchableOpacity> */}
            </View>
        );
    }
}


function mapStateToProps(state){
    return{
        username: state.username,
        password: state.password
    }
}

function mapDispatchToProps(dispatch){
    return{
        loginUser: () => dispatch({
            type: 'LOGIN_USER',
            //payload: user,
        }),
        setUsername: (username) => dispatch({
            type: 'GET_USER_USERNAME',
            payload:username
        }),
        setUserPassword: (password) => dispatch({
            type: 'GET_USER_PASSWORD',
            payload: password
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)

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
