import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import axios from 'axios'

export default class AddNutrition extends Component{

    state = {
        carbs: '',
        actualBloodSugar: '',
        targetBloodSugar: '',
        sid: '$2y$10$FHIRWIw/fZdROUZt2WPkee6dZMHCVYPeo3AtLw2zzYx1NHbJdSwma',
        baseDose: '',
        diffrenceBloodSugar: '',
        correctionDose: '',
        fullDose: ''
    }

    carbsHandler = val => {
        this.setState({
            carbs: val
        })
    }

    actualBloodSugarHandler = val => {
        this.setState({
            actualBloodSugar: val
        })
    }

    targetBloodSugarHandler = val => {
        this.setState({
            targetBloodSugar: val
        })
    }


    getInsulin = () =>{
        axios.post('http://hypefash.com/public/api/v1/client/insulin/calculate',{
            carbs: this.state.carbs,
            actualBloodSugar: this.state.actualBloodSugar,
            targetBloodSugar: this.state.targetBloodSugar,
            sid: this.state.sid
        })
        .then((response)=>{
            alert(response.data);
            this.setState({
                baseDose: response.data.baseDose,
                diffrenceBloodSugar: response.data.diffrenceBloodSugar,
                correctionDose: response.data.correctionDose,
                fullDose: response.data.fullDose
            })
        })
        .catch((error)=>{
            alert(error);
        })
    }    

    render(){
        return(
            <View style = {styles.container}>
                <TextInput placeholder="Maaltijdnaam" style = {styles.textInput}></TextInput>
                <TextInput placeholder="Huidige koolhydraten"  onChangeText = {this.carbsHandler} keyboardType={'numeric'} style = {styles.textInput}></TextInput>
                <TextInput placeholder="Huidige bloedspiegel" onChangeText = {this.actualBloodSugarHandler} keyboardType={'numeric'} style = {styles.textInput}></TextInput>
                <TextInput placeholder="Gewenste bloedspiegel" onChangeText = {this.targetBloodSugarHandler} keyboardType={'numeric'} style = {styles.textInput}></TextInput>
                <TouchableOpacity style = {styles.button} onPress = {this.getInsulin}>
                    <Text style = {styles.buttonText}>Krijg waarde</Text>
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