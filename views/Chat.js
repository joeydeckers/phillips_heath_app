import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, AsyncStorage}  from 'react-native';
import axios from 'axios'

export default class Chat extends Component{

        state = {
            chatMessage: "",
            chatMessages: [],
            userid: '2'
        };


    getMessages = async () => {
        const userToken = await AsyncStorage.getItem('userToken');
        axios.get('http://hypefash.com/public/api/v1/message/getall/patient?sid=' + JSON.parse(userToken) + '&recieverid=1')
        .then((response) => {
            this.setState({
                chatMessages:response.data.chats
            })
        })
        .catch((error) => {
            alert(error)
        })
    }

    sendMessage = async () => {
        const userToken = await AsyncStorage.getItem('userToken');
        axios.post('http://hypefash.com/public/api/v1/message/add?sid=' + JSON.parse(userToken),{
            message: this.state.chatMessage,
            recieverid: 1
        })
    }


    messageHandler = val =>{
        this.setState({
            chatMessage: val
        })
    }


    createChats = () => {
        return (
            <FlatList
            data={this.state.chatMessages}
            keyExtractor={(x, i) => i}
            renderItem={({ item }) =>
                <View style = {{flexDirection: 'row'}}>
                    <View>
                        {item.senderid == this.state.userid ? null : <Text>{item.message}</Text>}
                    </View>
                    <View style = {styles.messageSendContainer}>
                        {item.recieverid == this.state.userid ? null : <Text style = {styles.messageSend}>{item.message}</Text>}
                    </View>
                </View>
            }
        
            />
        )
      }

    componentDidMount(){
        this.getMessages();
    }  


    render(){
        return(
            <View style = {styles.container}>
                {this.createChats()}
                <View style = {styles.inputContainer}>
                    <TextInput style = {styles.textInput} onChangeText = {this.messageHandler} placeholder = "Uw chat"></TextInput>
                    <TouchableOpacity style = {styles.button} onPress = {this.sendMessage}>
                        <Text style = {styles.buttonText}>Verstuur bericht</Text>
                    </TouchableOpacity>
                </View>

            </View>
        )
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
        borderRadius: 8,
        width: '60%',
        justifyContent: 'flex-start'
    },
    inputContainer:{
        flexDirection: 'row'
    },
    button:{
        marginTop: 15,
        backgroundColor: '#4486FF',
        padding: 13,
        borderRadius: 8,
        justifyContent: 'flex-end'
    },
    buttonText:{
        color: '#fff',
        textAlign: 'center'
    },
    messageSendContainer:{
        backgroundColor: 'blue',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    messageSend:{
        color: '#fff',
    }
});
