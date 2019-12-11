import React, { Component } from 'react'
import { SafeAreaView, View, FlatList, StyleSheet, Text, TouchableOpacity,ActivityIndicator } from 'react-native'
import axios from 'axios'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import Icon from 'react-native-vector-icons/Feather';

export default class NutritionLog extends Component {

    state = {
        nutritionLog: [],
        day: '',
        option: '',
        loading: true
    }

    getNutritionLog = (currentDay) => {
        
        axios.get('http://hypefash.com/public/api/v1/client/meals/list?sid=$2y$10$rUUP/U9TfxGWImRtY.5zVOQbmJkocf6Pb8yKEHKwtX7yNlRgHsYCC&day=' + currentDay + '&option=' + this.state.option)
            .then((response) => {
                this.setState({ nutritionLog: response.data.list, day: response.data.day, loading: false });     
            })
    }


    componentDidMount() {
        
        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year

        
       
        var currentDay = year.toString() + '-' + month.toString() + '-' + date.toString();
        this.getNutritionLog(currentDay);
    }

    checkToday() {
        
        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year

        
       
        var currentDay = year.toString() + '-' + month.toString() + '-' + date.toString();
        if(this.state.day == currentDay){
            return(<Text style={styles.containerText}>Waardes van vandaag:</Text>);
        }
        else{
            return(<Text style={styles.containerText}>Waardes van {this.state.day}:</Text>);
        }
    }


    goWeekBack(){
        this.setState({
            option: 'weekback',
            loading: true
        })
        var date = new Date(this.state.day).getDate()l; //Current Date
        var month = new Date(this.state.day).getMonth() + 1; //Current Month
        var year = new Date(this.state.day).getFullYear(); //Current Year

       
        var currentDay = year.toString() + '-' + month.toString() + '-' + date.toString();
        this.getNutritionLog(currentDay);
    }

    goWeekNext(){
        this.setState({
            option: 'weeknext',
            loading: true
        })
        var date = new Date(this.state.day).getDate() + 7; //Current Date
        var month = new Date(this.state.day).getMonth() + 1; //Current Month
        var year = new Date(this.state.day).getFullYear(); //Current Year

       
        var currentDay = year.toString() + '-' + month.toString() + '-' + date.toString();
        this.getNutritionLog(currentDay);
    }

    goDayNext(){
        this.setState({
            option: 'daynext',
            loading: true
        })
        var date = new Date(this.state.day).getDate() + 1; //Current Date
        var month = new Date(this.state.day).getMonth() + 1; //Current Month
        var year = new Date(this.state.day).getFullYear(); //Current Year

       
        var currentDay = year.toString() + '-' + month.toString() + '-' + date.toString();
        this.getNutritionLog(currentDay);
    }

    goDayBack(){
        this.setState({
            option: 'dayback',
            loading: true
        })
        var date = new Date(this.state.day).getDate() - 1; //Current Date
        var month = new Date(this.state.day).getMonth() + 1; //Current Month
        var year = new Date(this.state.day).getFullYear(); //Current Year

       
        var currentDay = year.toString() + '-' + month.toString() + '-' + date.toString();
        this.getNutritionLog(currentDay);
    }

    render() {
        if(this.state.loading){
            return(<View><ActivityIndicator size="large" color="#0000ff" /></View>);
        }
        return (
            <View style={styles.container}>
               {this.checkToday()}
                <View style={styles.tableTopContainer}><View style={styles.newRow}><View style={styles.item}><Text style={styles.headTitle}>Naam</Text></View><View style={styles.item}><Text style={styles.headTitle}>Koolh.</Text></View><View style={styles.item}><Text style={styles.headTitle}>Datum</Text></View></View>
                </View>
                <View style={styles.tableBottomContainer}>
                    <SafeAreaView style={styles.itemContainer}>
                        <FlatList
                            data={this.state.nutritionLog}
                            keyExtractor={(x, i) => i}
                            renderItem={({ item }) =>
                                <View style={styles.newRow}>

                                    <View style={styles.item2}>
                                        <Text style={styles.title}>{item.name}</Text>
                                    </View>
                                    <View style={styles.item2}>
                                        <Text style={styles.title}>{item.carbohydrates}</Text>
                                    </View>
                                    <View style={styles.item2}>
                                        <Text style={styles.title2}>{item.time}</Text>
                                    </View>

                                </View>} />


                    </SafeAreaView>

                </View>
                <View style={styles.icon1}>
                    <View style={styles.icon2}>
                        <TouchableOpacity onPress={() => {this.goWeekBack();}}><View><Icon name="chevrons-left" size={42} color="#4486FF" /></View></TouchableOpacity>
                        <TouchableOpacity onPress={() => {this.goDayBack();}}><View><Icon name="chevron-left" size={42} color="#4486FF" /></View></TouchableOpacity>
                        <TouchableOpacity onPress={() => {this.goDayNext();}}><View><Icon name="chevron-right" size={42} color="#4486FF" /></View></TouchableOpacity>
                        <TouchableOpacity onPress={() => {this.goWeekNext();}}><View><Icon name="chevrons-right" size={42} color="#4486FF" /></View></TouchableOpacity>
                    </View>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        padding: 25
    },
    containerText: {
        fontSize: 24,
        padding: 5,
        marginBottom: 10,
    },
    itemContainer: {
        padding: 10,
        display: "flex",
        flexDirection: 'row'


    },
    newRow: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',

    },
    headTitle: {
        flexDirection: 'row',
        flex: 1,
        zIndex: 9,



    },
    itemContainerText: {
        fontSize: 16,
        marginTop: 5,
        marginBottom: 15

    },
    tableTopContainer: {
        borderRadius: 12,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        backgroundColor: '#4486FF',
        height: 30,
        padding: 7,
        width: '100%',

    },
    tableBottomContainer: {
        borderRadius: 12,
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
        borderColor: '#4486FF',
        borderTopColor: '#0000',
        borderWidth: 2,

        width: '100%',
    },
    item2: {
        width: '33%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    item: {
        width: '33%'
    },
    title: {
        fontSize: 16,
        alignSelf: 'flex-start',
        textAlign: 'left'
    },
    title2: {
        fontSize: 12,
        alignSelf: 'flex-start',
        textAlign: 'left'
    },
    icon1: {

        marginTop: 10,
        alignItems: 'center',



    },
    icon2: {

        flexDirection: 'row',
        alignItems: 'center',



    },

});
