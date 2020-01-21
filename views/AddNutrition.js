import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  AsyncStorage,
  SafeAreaView,
  Animated,
  Dimensions,
  StatusBar
} from "react-native";
import axios from "axios";
import Modal from "react-native-modalbox";
import Icon from "react-native-vector-icons/Feather";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { FloatingTitleTextInputField } from './floating_title_text_input_field';
var screen = Dimensions.get("window");

export default class AddNutrition extends Component{

    static navigationOptions = {
        header: null,
    };


    constructor(props) {
        super(props);
    
        this.offset = 0;
        this.state = {
          scrollOffset: new Animated.Value(0),
          loading: false,
          loadingButton: false,
          isErrorModal: false,
          isError2Modal: false,
          carbs: '',
        actualBloodSugar: '',
        targetBloodSugar: '',
        baseDose: '',
        diffrenceBloodSugar: '',
        correctionDose: '',
        fullDose: '',
        meal: ''
        };
      }


    _updateMasterState = (attrName, value) => {
        this.setState({ [attrName]: value });
      }
    
 
    getInsulin = async () => {
        const userToken = await AsyncStorage.getItem('userToken');
        console.log('https://hypefash.com/public/api/v1/client/insulin/calculate?sid=' + JSON.parse(userToken))
        axios.post('https://hypefash.com/public/api/v1/client/insulin/calculate?sid=' + JSON.parse(userToken),{
            carbs: this.state.carbs,
            actualbloodsugar: this.state.actualBloodSugar,
            differencebloodsugar: this.state.targetBloodSugar,

        })
        .then((response)=>{
            
            if(this.state.meal){
                  this.setState({
                    baseDose: response.data[0].basedose,
                    isErrorModal: true,
                  })
            }


        })
        .catch((error)=>{
            alert(error);
        })
    }    
    getInsulinMeal = async () => {
        const userToken = await AsyncStorage.getItem('userToken');
        console.log('https://hypefash.com/public/api/v1/client/meals/add?sid=' + JSON.parse(userToken))
        axios.post('https://hypefash.com/public/api/v1/client/meals/add?sid=' + JSON.parse(userToken),{
            name: this.state.meal,
            daypart: 1,
            carbohydrates: this.state.carbs,

        })
        .catch((error)=>{
            alert(error);
        })
    }    

    updateUser() {

        if(this.state.carbs == '' || this.state.actualBloodSugar == '' || this.state.targetBloodSugar == '' || this.state.meal == '')
        {
            this.setState({
                isError2Modal: true,
              })
        }
        else{
            this.getInsulinMeal();
            this.getInsulin();
        }
       
       
      }

      
    componentDidMount() {
        this.state.scrollOffset.addListener(({ value }) => (this.offset = value));
      }
    
      onScroll = e => {
        const scrollSensitivity = 4 / 3;
        const offset = e.nativeEvent.contentOffset.y / scrollSensitivity;
        this.state.scrollOffset.setValue(offset);
      };


      getStatus() {
        if (this.state.loadingButton == false) {
          return (
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => this.updateUser()}
            >
              <View
                style={[
                  styles.button,
                  {
                    backgroundColor: "#4486FF",
                    flexDirection: "row",
         
                    justifyContent: "center"
                  }
                ]}
              >
                <Text style={[{ color: "#fff",fontWeight: 'bold', }, styles.buttonText]}>
                  Toevoegen
                </Text>
              </View>
            </TouchableOpacity>
          );
        }
        else {
          return (
            <TouchableOpacity style={styles.buttonContainer} >
              <View style={[styles.button, { backgroundColor: '#4486FF', flexDirection: 'row', justifyContent: 'center', }]}>
                <View
                  style={{
    
                    justifyContent: "flex-start",
                    flexDirection: "row"
                  }}
                >
                  <ActivityIndicator size="small" color="#fff" />
                </View>
                <View
                  style={{
                    justifyContent: "flex-start",
                    
                    flexDirection: "row"
                  }}
                >
                  <Text style={[{ color: '#fff',fontWeight: 'bold' }, styles.buttonText]}>controleren</Text>
                </View>
    
              </View>
            </TouchableOpacity>
    
          );
        }
      }
    

      render() {
        const { scrollOffset } = this.state;
        const screenWidth = Dimensions.get('window').width;
    
        if (this.state.loading) {
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
                    Waarde toevoegen
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
                {[0, 1].map((_, index) => (
                  <View key={index} style={{ marginBottom: 12 }}>
                    <SkeletonPlaceholder>
                      <View style={{ flexDirection: "row" }}>
    
    
                        <View
                          style={{
                            justifyContent: "space-between",
                            marginLeft: 12,
                            flex: 1
                          }}
                        >
                          <View style={{ width: "50%", height: 20, marginBottom: 15, marginLeft: 10 }} />
                          <View style={{ width: "30%", height: 20, marginBottom: 15, marginLeft: 10 }} />
                          <View style={{ width: "80%", height: 20, marginBottom: 15, marginLeft: 10 }} />
                        </View>
                      </View>
                    </SkeletonPlaceholder>
                  </View>
                ))}
                {/* <TouchableOpacity
              style={styles.buttonContainer}
             
            >
              <View
                style={[
                  styles.button,
                  {
                    backgroundColor: "#22242A",
                    flexDirection: "row",
                    justifyContent: "center"
                  }
                ]}
              >
                <Text style={[{ color: "#fff" }, styles.buttonText]}>
                  Wijzigen opslaan
                </Text>
              </View>
            </TouchableOpacity> */}
              </ScrollView>
            </SafeAreaView>
          );
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
                  Waarde toevoegen
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
              <View style={styles.formContainer}>
                <Text>Vul hier jouw maaltijd in.</Text>
                <FloatingTitleTextInputField
                  attrName='meal'
                  title='Maaltijd'
                  value={this.state.meal}
                  height={45}
                  autoFocus={true}
                  multi={false}
                  updateMasterState={this._updateMasterState}
                />
                <Text style={styles.helpText}>Hoeveel koolhydraten bevat deze maaltijd?</Text>
                <FloatingTitleTextInputField
                  attrName='carbs'
                  title='Huidige koolhydraten'
                  value={this.state.carbs}
                  multi={false}
                  length={14}
                  autoFocus={true}
                  keyboardType={'numeric'}
                  height={45}
                  updateMasterState={this._updateMasterState}
                />
                <Text style={styles.helpText}>Wat is jouw huidige bloedspiegel?</Text>
                <FloatingTitleTextInputField
                  attrName='actualBloodSugar'
                  title='Huidige bloedspiegel'
                  value={this.state.actualBloodSugar}
                  multi={false}
                  autoFocus={true}
                  keyboardType={'numeric'}
                  height={45}
                  updateMasterState={this._updateMasterState}
                />
                <Text style={styles.helpText}>Wat is jouw gewenste bloedspiegel?</Text>
                <FloatingTitleTextInputField
                  attrName='targetBloodSugar'
                  title='Gewenste bloedspiegel'
                  value={this.state.targetBloodSugar}
                  multi={false}
                  autoFocus={true}
                  keyboardType={'numeric'}
                  height={45}
                  updateMasterState={this._updateMasterState}
                />
    
    
              </View>
              {this.getStatus()}
              <View style={{ height: 100, width: '100%' }}></View>
            </ScrollView>
            <Modal
              coverScreen
              isOpen={this.state.isErrorModal}
              onClosed={() => this.setState({ isErrorModal: false })}
              style={styles.modal}
              position={"bottom"}
            >
              <View
                style={{
                  width: screen.width,
                  paddingLeft: 20,
                  paddingRight: 20,
                  marginTop: 15,
                  flex: 1
                }}
              >
                <Text style={styles.PayTitle}>Toegevoegd</Text>
                <Text style={styles.subTitle2}>
                  Resultaat: {this.state.baseDose}
                </Text>
                <View
                  style={{
                    width: "100%",
                    flex: 1,
                    justifyContent: 'flex-end',
                    marginBottom: 36
                  }}
                >
                  <TouchableOpacity
                    onPress={() => this.setState({ isErrorModal: false })}
                    style={[
                      styles.button2,
                      {
                        backgroundColor: "#4486FF",
                        flexDirection: "row",
                        justifyContent: "center"
                      }
                    ]}
                  >
                    <Text style={[{ color: "#fff", fontWeight: 'bold' }, styles.buttonText]}>
                      Sluiten
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>

            <Modal
              coverScreen
              isOpen={this.state.isError2Modal}
              onClosed={() => this.setState({ isError2Modal: false })}
              style={styles.modal}
              position={"bottom"}
            >
              <View
                style={{
                  width: screen.width,
                  paddingLeft: 20,
                  paddingRight: 20,
                  marginTop: 15,
                  flex: 1
                }}
              >
                <Text style={styles.PayTitle}>Oops!</Text>
                <Text style={styles.subTitle2}>
                  Je moet alle velden invoeren.
                </Text>
                <View
                  style={{
                    width: "100%",
                    flex: 1,
                    justifyContent: 'flex-end',
                    marginBottom: 36
                  }}
                >
                  <TouchableOpacity
                    onPress={() => this.setState({ isError2Modal: false })}
                    style={[
                      styles.button2,
                      {
                        backgroundColor: "#000",
                        flexDirection: "row",
                        justifyContent: "center"
                      }
                    ]}
                  >
                    <Text style={[{ color: "#fff" }, styles.buttonText]}>
                      Sluiten
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </SafeAreaView>
        );
      }
    }
    

    const styles = StyleSheet.create({
        container: {
          paddingBottom: 20,
          paddingTop: 10,
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
        cartTitle: {
          fontSize: 35,
          left: 40,
          fontWeight: "bold"
        },
        helpText: {
          marginTop: 10,
        },
        iconTop: {
          position: "absolute",
          zIndex: 9,
          marginTop: 4,
          marginLeft: -10,
          padding: 8
        },
        formContainer: {
          marginLeft: 20,
          marginRight: 20,
          paddingBottom: 20
      
        },
        buttonContainer: {
          marginTop: 18,
          color: "#fff",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 5
          },
          shadowOpacity: 0.34,
          shadowRadius: 6.27,
          elevation: 10
        },
        button: {
          padding: 15,
          marginLeft: 20,
          marginRight: 20,
          paddingRight: 70,
          paddingLeft: 70,
          borderRadius: 10
        },
        icon: {
          flexDirection: "row",
          justifyContent: "flex-start"
        },
        buttonText: {
          flexDirection: "row",
          fontSize: 15,
          marginLeft: 10,
          textAlign: "center"
        },
        modal: {
          height: 230,
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20
        },
        PayTitle: {
          fontSize: 25,
          fontWeight: "bold",
          textAlign: 'center'
        },
        subTitle2: {
          fontSize: 17,
          marginTop: 20,
          fontWeight: '400',
        },
        button2: {
          padding: 15,
          textAlign: 'center',
          borderRadius: 10,
        },
      });
      