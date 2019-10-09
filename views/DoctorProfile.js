import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView,Image,Button} from 'react-native';

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
                <View >
                    <TouchableOpacity>
                    <Text style ={styles.speakButton}>Spreek met je dokter</Text>
                    </TouchableOpacity>   
                </View> 
                <Text style ={styles.doctorInfoText}> Informatie</Text>
                <View style = {styles.containerInfo}>                    
                    <Image style = {styles.doctorImage2}                   
                    source={require('./../Images/TestImage2.jpg')}
                    />  
                    <Text style ={styles.doctorInfoText2}> Huisartsenpraktijk Forum voor Gezondheid</Text>        
                                   
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
        backgroundColor: '#DADADA',

    },
    speakButton:{
        fontWeight:'bold',
        padding:10,
        textAlign :"center",  
        color:"white"      ,
        backgroundColor:'#4486FF',
        borderRadius:8,
        margin: 25,
        marginTop: 10,
        marginBottom: 10,
        height:40,
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
        fontSize: 16,
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
        
    
});
