import React, { Component } from 'react'
import { SafeAreaView, View, FlatList, StyleSheet, Text } from 'react-native'
import axios from 'axios'
import { Colors } from 'react-native/Libraries/NewAppScreen'


export default class NutritionLog extends Component {

    state = {
        nutritionLog: [],

    }

    getNutritionLog = (hal) => {
        axios.get('http://hypefash.com/public/api/v1/client/meals/list?sid=$2y$10$rUUP/U9TfxGWImRtY.5zVOQbmJkocf6Pb8yKEHKwtX7yNlRgHsYCC&day='+ hal)
            .then((response) => {
                this.setState({ nutritionLog: response.data });
                console.log(response.data);
                console.log(this.state.nutritionLog)
            })
    }

    componentDidMount() {
        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year

        var hal = year.toString() + '-' + month.toString() + '-' + date.toString();


        this.getNutritionLog(hal);
    }


    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.containerText}>Waardes van vandaag:</Text>
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

});
