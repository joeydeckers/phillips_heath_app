import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import axios from 'axios'

export default class NutritionLog extends Component {

    state ={
        nutritionLog: []
    }

    getNutritionLog = () => {
        axios.get('http://hypefash.com/public/api/v1/client/insulin/list?sid=$2y$10$FHIRWIw/fZdROUZt2WPkee6dZMHCVYPeo3AtLw2zzYx1NHbJdSwma')
        .then((response) => {
            alert(response.data.list); 
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
