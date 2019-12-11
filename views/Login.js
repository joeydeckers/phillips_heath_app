import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux'
import * as user from '../src/actions'

class Login extends Component{

    getUserInfo = (text) =>{
        this.props.dispatch(register(text))
    }

    state = {
        loginEmail : '',
        loginPassword : ''
    }

    loginEmailHandler = val => {
        this.setState({
            loginEmail: val
        });
    }

    loginPasswordHandler = val => {
        this.setState({
            loginPassword: val
        })
    }

    render(){
        return(
            <View style = {styles.container}>
                <Text style = {styles.headingTitle}>Welkom bij het platform</Text>
                <TextInput 
                    style = {styles.textInput} 
                    placeholder = "Uw gebruikersnaam"
                    value = {this.getUserInfo}
                    //onChangeText = {this.props.setUsername}
                    //onChangeText = {(text) => this.setState({text})}
                    autoCapitalize = 'none'
                    value = {this.state.loginEmail} 
                    onChangeText = {this.loginEmailHandler}
                />
                <TextInput 
                    style = {styles.textInput}
                    placeholder = "Uw wachtwoord"
                    secureTextEntry={true}
                    //value = {this.props.password}
                    //onChangeText = {this.props.setUserPassword}
                    autoCapitalize = 'none'
                    value = {this.state.loginPassword} 
                    onChangeText = {this.loginPasswordHandler}
                />
                {/* <TouchableOpacity style = {styles.button} onPress = {() => this.props.loginUser()}>
                    <Text style = {styles.buttonText}>Inloggen</Text>
                </TouchableOpacity> */}
                <TouchableOpacity style = {styles.button} onPress = {() => this.props.login({username:this.state.loginEmail, password: this.state.loginPassword})}>
                {/* <TouchableOpacity style = {styles.button} onPress = {() => alert(this.state.loginPassword)}> */}

                    <Text style = {styles.buttonText}>Inloggen</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity style = {styles.button} onPress = {this.loginUser}>
                    <Text style = {styles.buttonText}>Inloggen</Text>
                </TouchableOpacity> */}

                <Text>{this.props.sid}</Text>
            </View>
        );
    }
}


// function mapStateToProps(state){
//     return{
//         username: state.username,
//         password: state.password
//     }
// }

// function mapDispatchToProps(dispatch){
//     return{
//         loginUser: () => dispatch({
//             type: 'LOGIN_USER',
//             //payload: user,
//         }),
//         setUsername: (username) => dispatch({
//             type: 'GET_USER_USERNAME',
//             payload:username
//         }),
//         setUserPassword: (password) => dispatch({
//             type: 'GET_USER_PASSWORD',
//             payload: password
//         })
//     }
// }

function mapStateToProps(state){
    return{
        sid: state.sid
    }
}

// value setters maken

function mapDispatchToProps(dispatch) {
    return {
        login: (userInfo) => {dispatch(user.login({username: userInfo.username, password: userInfo.password}));}
    }
}

//export default connect(mapStateToProps, mapDispatchToProps)(Login)
export default connect(mapStateToProps, mapDispatchToProps)(Login);

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
