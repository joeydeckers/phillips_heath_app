import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView,Image,Button} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export default class Login extends Component{
    render(){
        return(
            <ScrollView style = {styles.container}>
                <View style = {styles.doctorInfoContainer}>             
                    <Image style = {styles.doctorImage}                   
                    source={require('./../Images/TestImage2.jpg')}
                    />
                    <Text style ={styles.doctorTitle}> Dokter Baudet </Text>
                </View> 
                
                <View style ={styles.containerInfoStrokesFull}>
                    <View style ={styles.containerInfoStrokes}>                        
                        <View style = {styles.containerInfo}>                    
                        <Text style ={styles.passwordIcon}><Icon name="activity" size={42} color="#000" /></Text>  
                            <Text style ={styles.doctorInfoText2}>Huisartsenpraktijk De pauper</Text>  
                        </View>       
                    </View>
                    <View style ={styles.containerInfoStrokes}>                    
                        <View style = {styles.containerInfo}>                    
                        <Text style ={styles.passwordIcon}><Icon name="mail" size={42} color="#000" /></Text>  
                            <Text style ={styles.doctorInfoText2}>thierry@fvd.nl</Text>        
                                        
                        </View>       
                    </View>
                    <View style ={styles.containerInfoStrokes}>                    
                        <View style = {styles.containerInfo}>                    
                        <Text style ={styles.passwordIcon}><Icon name="phone-call" size={42} color="#000" /></Text> 
                            <Text style ={styles.doctorInfoText2}>0493-3265874</Text>        
                                        
                        </View>       
                    </View>
                    </View>
                    <View >
                    <TouchableOpacity>
                    <Text style ={styles.speakButton}>Spreek met je dokter</Text>
                    </TouchableOpacity>   
                </View> 
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        
        
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
        paddingTop: 40,
        padding: 25,
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor: '#F1F1F1',

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
    passwordIcon:{
        
        marginLeft: 8  ,
        marginTop: 8,
        marginRight: 8,
        
    },
    doctorInfoText:{
        fontWeight:'bold',
        padding:10,
        textAlign :"center", 
        fontSize: 32,
    },
    doctorInfoText2:{
        padding:10,
        textAlign :"center", 
        fontSize: 20,
        marginTop: 2,
        marginLeft: 10, 
        
        
    },
    doctorImage2:{
        height:75,
        width:75,
        borderRadius:150,      
        marginLeft:5,
        marginRight:1,
        justifyContent:"flex-start",
        

    },
    containerInfo:{
        flexDirection:"row",
    },
    containerInfoStrokes:{
        marginTop: 20,
    },
    containerInfoStrokesFull:{
        padding:20,

    },
        
    
});
