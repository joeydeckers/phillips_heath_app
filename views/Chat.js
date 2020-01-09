import React, {Component} from 'react';
import { Text, Platform, RefreshControl, KeyboardAvoidingView, View, AsyncStorage, StyleSheet, Image, Animated, StatusBar, TextInput, TouchableOpacity } from 'react-native'
import axios from 'axios';
import Icon from 'react-native-vector-icons/Feather';
import { FlatList } from 'react-native-gesture-handler';
import SafeAreaView from 'react-native-safe-area-view';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export default class Chat extends Component{
    static navigationOptions = {
        header: null,
      };

        state = {
            chatMessage: "",
            chatMessages: [],
            userid: '',
            recieverimage: 'https://hcplive.s3.amazonaws.com/v1_media/_image/happydoctor.jpg',
            recieverid: ''
        };


    getMessages = async () => {
        const userToken = await AsyncStorage.getItem('userToken');
        axios.get('https://pivoxa.nl/public/api/v1/message/getall/patient?sid=' + JSON.parse(userToken) + '&recieverid=1')
        .then((response) => {
            this.setState({
                chatMessages:response.data.chats,
                userid: response.data.userid,
                recieverid: response.data.recieverid,
            })
        })
        .catch((error) => {
            alert(error)
        })
    }

    sendMessage = async () => {
        const userToken = await AsyncStorage.getItem('userToken');
        axios.post('https://pivoxa.nl/public/api/v1/message/add/patient?sid=' + JSON.parse(userToken),{
            message: this.state.chatMessage,
            recieverid: this.state.recieverid
        })
        .then((response) => {
            this.getMessages();
            this.setState({
              chatMessage: ""
          })
        })
    }


    messageHandler = val =>{
        this.setState({
            chatMessage: val
        })
    }


      createChats() {

        return (
          <AnimatedFlatList
            inverted
    
            data={this.state.chatMessages}
            keyExtractor={(x, i) => i}
            renderItem={({ item }) =>
    
              <View>
    
                {item.recieverid == this.state.userid ? <View style={{ alignItems: 'flex-start' }}><View style={{ justifyContent: 'flex-start', flexDirection: 'row' }}><Image style={styles.userProfileChat} source={{ uri: this.state.recieverimage }} /><Text style={styles.chatLeft}>{item.message}</Text></View><Text style={styles.time}>{item.time}</Text></View> : <View style={{ alignItems: 'flex-end' }}><Text style={styles.chatRight}>{item.message}</Text><Text style={styles.time2}>{item.time}</Text></View>}
    
              </View>
            }
    
          />)
      }

    componentDidMount() {
        this.getMessages();
    
        this.interval = setInterval(
          () => this.getMessages(), 2000);
      }
      componentWillUnmount() {
        clearInterval(this.interval);
      }


    render(){
        return(
            <SafeAreaView style={{ backgroundColor: '#fff', height: '100%', }}>
        <StatusBar backgroundColor="#22242A" barStyle="white-content" translucent={false} />
        
        <View style={styles.container}>
          <View style={{ flexDirection: "row", height: '100%' }}>
            {this.createChats()}
          </View>

        </View>
        <View style={styles.chatInputContainer}>
          <TextInput ref={input => { this.textInput = input }} placeholderTextColor="#8A8A8F" value={this.state.chatMessage} onChangeText={this.messageHandler} style={styles.chatInput} placeholder='Jouw bericht' />
          <TouchableOpacity onPress={this.sendMessage}>
            <Icon style={styles.sendIcon} name='send' size={15} color='#fff' />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        width: '100%',
        marginBottom: 80,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 0
      },
      header: {
        padding: 10,
        paddingTop: Platform.OS === 'ios' ? 40 : 15,
        paddingBottom: 15,
        flexDirection: 'row',
        backgroundColor: '#22242A',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
    
        elevation: 8,
      },
      headerProfileName: {
        color: '#fff',
        fontWeight: 'bold'
      },
      chatInfo: {
        marginLeft: 15,
      },
      userProfile: {
        height: 35,
        width: 35,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#fff',
        marginTop: 2
      },
      userProfileChat: {
        height: 30,
        width: 30,
        borderRadius: 5,
        marginRight: 5,
        marginTop: 4
      },
      productName: {
        color: '#fff'
      },
      chatLeft: {
        backgroundColor: '#22242A',
        color: '#fff',
        padding: 10,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15,
        marginTop: 5,
        maxWidth: '80%',
    
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    
      },
      chatRight: {
        backgroundColor: '#eee',
        padding: 10,
        maxWidth: '80%',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 15,
        marginTop: 5,
    
      },
      chatInputContainer: {
        position: 'absolute',
        padding: 5,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        bottom: 0,
        backgroundColor: '#eee',
        borderRadius: 30,
        flexDirection: 'row'
      },
      chatInput: {
        width: '90%',
        paddingLeft: 10,
      },
      sendIcon: {
        backgroundColor: '#22242A',
        padding: 10,
        top: Platform.OS === 'ios' ? 0 : 6,
        borderRadius: 18
      },
      backArrow: {
        marginTop: 8,
        marginRight: 15
      },
      time: {
        color: '#8A8A8F',
        fontSize: 8,
        top: -8,
        marginLeft: 2
      },
      time2: {
        color: '#8A8A8F',
        fontSize: 8,
        top: 0,
        marginRight: 2,
        marginBottom: 5
      }
});
