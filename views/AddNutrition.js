import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity,AsyncStorage} from 'react-native';
import axios from 'axios'
import {connect} from 'react-redux'
import * as nutrition from '../src/actions/NutitionAction'

export default class AddNutrition extends Component{

    state = {
        carbs: '',
        actualBloodSugar: '',
        targetBloodSugar: '',
        baseDose: '',
        diffrenceBloodSugar: '',
        correctionDose: '',
        fullDose: '',
        meal: ''
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

    mealHandler = val => {
        this.setState({
            meal: val
        })
    }

    targetBloodSugarHandler = val => {
        this.setState({
            targetBloodSugar: val
        })
    }

 
    getInsulin = async () => {
        const userToken = await AsyncStorage.getItem('userToken');
        axios.post('http://hypefash.com/public/api/v1/client/insulin/calculate?sid=' + JSON.parse(userToken),{
            carbs: this.state.carbs,
            actualbloodsugar: this.state.actualBloodSugar,
            differencebloodsugar: this.state.targetBloodSugar,

        })
        .then((response)=>{
            this.props.navigation.navigate('NutritionResult', {
                baseDose: response.data[0].basedose,
              });

        })
        .catch((error)=>{
            alert(error);
        })
    }    
    getInsulinMeal = async () => {
        const userToken = await AsyncStorage.getItem('userToken');
        axios.post('http://hypefash.com/public/api/v1/client/meals/add?sid=' + JSON.parse(userToken),{
            name: this.state.meal,
            daypart: 1,
            carbohydrates: this.state.carbs,

        })
        .catch((error)=>{
            alert(error);
        })
    }    

    render(){
        return(
            <View style = {styles.container}>
                <TextInput placeholder="Maaltijdnaam" onChangeText = {this.mealHandler} style = {styles.textInput}></TextInput>
                <TextInput placeholder="Huidige koolhydraten"  onChangeText = {this.carbsHandler} keyboardType={'numeric'} style = {styles.textInput}></TextInput>
                <TextInput placeholder="Huidige bloedspiegel" onChangeText = {this.actualBloodSugarHandler} keyboardType={'numeric'} style = {styles.textInput}></TextInput>
                <TextInput placeholder="Gewenste bloedspiegel" onChangeText = {this.targetBloodSugarHandler} keyboardType={'numeric'} style = {styles.textInput}></TextInput>
                <TouchableOpacity style = {styles.button} onPress={() => { this.getInsulinMeal(); this.getInsulin()}}>
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
