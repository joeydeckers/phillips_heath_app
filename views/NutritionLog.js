import React, { Component } from 'react'
import { SafeAreaView, View, FlatList, StyleSheet,ScrollView,StatusBar, Text, TouchableOpacity,ActivityIndicator,AsyncStorage,Animated,Dimensions } from 'react-native'
import axios from 'axios'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import Icon from 'react-native-vector-icons/Feather';

export default class NutritionLog extends Component {
    static navigationOptions = {
        header: null,
    };
    
    
    constructor(props) {
        super(props);
    
        this.offset = 0;
        this.state = {
          scrollOffset: new Animated.Value(0),
          nutritionLog: [],
          day: '',
          option: '',
          loading: true
        };
      }



    getNutritionLog  = async (currentDay) => {
        const userToken = await AsyncStorage.getItem('userToken');
        axios.get('https://hypefash.com/public/api/v1/client/meals/list?sid=' + JSON.parse(userToken) + '&day=' + currentDay + '&option=' + this.state.option)
            .then((response) => {
                console.log('https://hypefash.com/public/api/v1/client/meals/list?sid=' + JSON.parse(userToken) + '&day=' + currentDay + '&option=' + this.state.option)
                this.setState({ 
                    nutritionLog: response.data.list, 
                    day: response.data.day, 
                    loading: false });     
            })
    }


    componentDidMount() {
        this.state.scrollOffset.addListener(({ value }) => (this.offset = value));
        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year

        
       
        var currentDay = year.toString() + '-' + month.toString() + '-' + date.toString();
        this.getNutritionLog(currentDay);
       
    }
  
    onScroll = e => {
      const scrollSensitivity = 4 / 3;
      const offset = e.nativeEvent.contentOffset.y / scrollSensitivity;
      this.state.scrollOffset.setValue(offset);
    };

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
        var date = new Date(this.state.day).getDate(); //Current Date
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



    renderItem = data => (
        <TouchableOpacity style={styles.card}>
          <View style={styles.cartcontent}>
            <View style={styles.containerDetailsLeft}>
    <Text style={styles.sellerTextItem}>{data.item.carbohydrates} kcal. | {data.item.name}</Text>
            </View>
            <View style={styles.containerDetailsRight}>
              <Text style={styles.sellerTextItem}>{data.item.time}</Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    
      FlatListItemSeparator = () => {
        return (
          <View
            style={{
              height: 0.5,
              width: "100%"
            }}
          />
        );
      };
    
      showCatData() {
        if (this.state.nutritionLog.length == 0) {
          return (
            <Text style={styles.emptytransaction}>
              Geen waardes toegevoegd.
            </Text>
          );
        } else {
          return (
            <FlatList
              data={this.state.nutritionLog}
              ItemSeparatorComponent={this.FlatListItemSeparator}
              renderItem={item => this.renderItem(item)}
              keyExtractor={item => item.id}
            />
          );
        }
      }


    render() {
        const { scrollOffset } = this.state;
        const screenWidth = Dimensions.get('window').width;

        if(this.state.loading){
            return(<View><ActivityIndicator size="large" color="#0000ff" /></View>);
        }
        return (
            <SafeAreaView >
            <Animated.View
              style={[
                styles.header,
                {
                  paddingHorizontal: screenWidth * 0.05,
                  width: screenWidth,
                  height: scrollOffset.interpolate({
                    inputRange: [0, 200],
                    outputRange: [100, 50],
                    extrapolate: 'clamp',
                  }),
                },
              ]}>
              <View style={{
                justifyContent: 'flex-start', textAlignVertical: 'center', flexDirection: 'row', alignItems: 'center',
                textAlign: 'center',
              }}>
                <Animated.Text
                  onLayout={e => {
                    if (this.offset === 0 && this.state.titleWidth === 0) {
                      const titleWidth = e.nativeEvent.layout.width;
                      this.setState({ titleWidth });
                    }
                  }}
                  style={{
                    fontWeight: 'bold',
                    justifyContent: 'flex-start', textAlignVertical: 'center',
                    fontSize: scrollOffset.interpolate({
                      inputRange: [0, 200],
                      outputRange: [35, 25],
                      extrapolate: 'clamp',
                    }),
                  }}>
                  Mijn waardes
              </Animated.Text>
              </View>
              {/* <Animated.View
                style={{
                  width: scrollOffset.interpolate({
                    inputRange: [0, 200],
                    outputRange: [screenWidth * 0.9 - this.state.titleWidth, 0],
                    extrapolate: 'clamp',
                  }),
                }}
              /> */}
            </Animated.View>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false} onScroll={this.onScroll}
              scrollEventThrottle={20}>
    
              <StatusBar
                backgroundColor="white"
                barStyle="dark-content"
                translucent={false}
              />
               {this.checkToday()}
        
                <View style={styles.transactionscontainer}>
            {this.showCatData()}
          </View>

                <View style={styles.icon1}>
                    <View style={styles.icon2}>
                        <TouchableOpacity onPress={() => {this.goWeekBack();}}><View><Icon name="chevrons-left" size={42} color="#1976d2" /></View></TouchableOpacity>
                        <TouchableOpacity onPress={() => {this.goDayBack();}}><View><Icon name="chevron-left" size={42} color="#1976d2" /></View></TouchableOpacity>
                        <TouchableOpacity onPress={() => {this.goDayNext();}}><View><Icon name="chevron-right" size={42} color="#1976d2" /></View></TouchableOpacity>
                        <TouchableOpacity onPress={() => {this.goWeekNext();}}><View><Icon name="chevrons-right" size={42} color="#1976d2" /></View></TouchableOpacity>
                    </View>
                </View>
                <View style={{height: 1000, width: '100%'}}></View>
            </ScrollView>
           
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
          paddingBottom: 20,
          paddingTop: 10,
          paddingLeft:20,
          paddingRight:20,
          backgroundColor: '#fff'
        },
        header: {
          flexDirection: 'row',
          alignItems: 'flex-end',
          justifyContent: 'flex-start',
          paddingLeft: 20,
          paddingRight: 20,
          paddingBottom: 10,
          backgroundColor: '#fff'
        },
        card: {
            flex: 1,
            width: "100%",
        
            backgroundColor: "#fff",
            borderBottomColor: "#707070"
          },
          transactionscontainer: {
            marginBottom: 15
          },
          containerDetailsLeft: {
            width: "100%",
            flex: 1,
            flexDirection: "row",
            justifyContent: "flex-start"
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
    cartcontent: {
        backgroundColor: "#fff",
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomWidth: 3,
        borderBottomColor: "#F8F8F8",
        flexDirection: "row"
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
    emptytransaction: {
        fontWeight: "bold",
        fontSize: 16,
        marginTop: 10,
        marginLeft:10,
        alignItems: "flex-start",
        justifyContent: "flex-start",
        textAlign: "left"
      },
    tableTopContainer: {
        borderRadius: 12,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        backgroundColor: '#1976d2',
        height: 30,
        padding: 7,
        width: '100%',

    },
    tableBottomContainer: {
        borderRadius: 12,
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
        borderColor: '#1976d2',
        borderTopColor: '#0000',
        borderWidth: 2,

        width: '100%',
    },
    sellerTextItem: {
        fontWeight: "bold",
        fontSize: 16
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
