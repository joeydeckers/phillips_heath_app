import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import axios from 'axios'

export default class NutritionLog extends Component {

    state ={
        nutritionLog: []
    }

    getNutritionLog = () => {
        axios.get('http://hypefash.com/public/api/v1/client/insulin/list')
        .then((response) => {
            alert(response.data.status); 
        })
    }

    componentDidMount(){
        this.getNutritionLog();
    }

    render() {
        return (
            <View style = {styles.container}>
                <Text> textInComponent </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        marginTop: 40,
        padding: 25
    }
});
