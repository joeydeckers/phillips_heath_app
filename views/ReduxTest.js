import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import {connect} from 'react-redux'

 class ReduxTest extends Component {
    render() {
        return (
            <View style = {styles.container}>
                <TouchableOpacity onPress = {() => this.props.increaseCounter()}>
                    <Text> Increase </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress = {() => this.props.decreaseCounter()}>
                    <Text> Decrease </Text>
                </TouchableOpacity>
                <Text> {this.props.counter} </Text>
            </View>
        )
    }
}


function mapStateToProps(state){
    return{
        counter: state.counter
    }
}

function mapDispatchToProps(dispatch){
    return{
        increaseCounter: () => dispatch({
            type: 'INCREASE_COUNTER'
        }),
        decreaseCounter: () => dispatch({
            type: 'DECREASE_COUNTER'
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReduxTest)

const styles = StyleSheet.create({
    container:{
        marginTop: 50,
        padding: 20
    }
})

