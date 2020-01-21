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
export default class PersonalInfo extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this.offset = 0;
    this.state = {
      scrollOffset: new Animated.Value(0),
      loading: true,
      loadingButton: false,
      isErrorModal: false,
      name: "",
      email: "",
      username: '',
      insulinsensitivity: "",
    };
  }

  infoHandler = val => {
    this.setState({
      personalinformation: val
    });
  };

  passwordHandler = val => {
    this.setState({
      password: val
    });
  };
  passwordCheckHandler = val => {
    this.setState({
      passwordcheck: val
    });
  };
  getUserInfo = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    axios.get('https://hypefash.com/public/api/v1/client/info?sid=' + JSON.parse(userToken))
      .then((response) => {
        this.setState({
          loading: false,
          email: response.data.email || "Geen email",
          name: response.data.name || "Geen naam",
          username: response.data.username || "Geen gebruikersnaam",
          insulinsensitivity: response.data.insulinsensitivity || "Insulinewaarde niet ingevuld"
        })
      })
      .catch((error) => {
        alert(error)
      })
  }





  componentDidMount() {
    this.state.scrollOffset.addListener(({ value }) => (this.offset = value));
    this.getUserInfo();
  }

  onScroll = e => {
    const scrollSensitivity = 4 / 3;
    const offset = e.nativeEvent.contentOffset.y / scrollSensitivity;
    this.state.scrollOffset.setValue(offset);
  };

  _updateMasterState = (attrName, value) => {
    this.setState({ [attrName]: value });
  }

  updateUser() {
    this.setState({
      loadingButton: false,
      isErrorModal: true,
    })
  }


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
                backgroundColor: "#1976d2",
                flexDirection: "row",
                justifyContent: "center"
              }
            ]}
          >
            <Text style={[{ color: "#fff", fontWeight: 'bold' }, styles.buttonText]}>
              Wijzigen opslaan
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
    else {
      return (
        <TouchableOpacity style={styles.buttonContainer} >
          <View style={[styles.button, { backgroundColor: '#1976d2', flexDirection: 'row', justifyContent: 'center', }]}>
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
              <Text style={[{ color: '#fff', fontWeight: 'bold' }, styles.buttonText]}>controleren</Text>
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
              <TouchableOpacity style={{ justifyContent: 'flex-start', textAlignVertical: 'center', marginRight: 10 }} onPress={() => this.props.navigation.goBack()}>
                <Icon name='chevron-left' size={32} color='#000' />
              </TouchableOpacity>
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
                Mijn gegevens
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
                backgroundColor: "#1976d2",
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
            <TouchableOpacity style={{ justifyContent: 'flex-start', textAlignVertical: 'center', marginRight: 10 }} onPress={() => this.props.navigation.goBack()}>
              <Icon name='chevron-left' size={32} color='#000' />
            </TouchableOpacity>
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
              Mijn gegevens
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
            <Text>Jouw emailadres is niet aanpasbaar. Indien je écht geen toegang meer hebt tot jouw account kunt u ons contacteren.</Text>
            <FloatingTitleTextInputField
              attrName='email'
              title='Emailadres'
              value={this.state.email}
              disabled={false}
              height={50}
              autoFocus={true}
              multi={false}
              updateMasterState={this._updateMasterState}
            />
            <Text style={styles.helpText}>Jouw gebruikersnaam is niet aanpasbaar. Indien je écht geen toegang meer hebt tot jouw account kunt u ons contacteren.</Text>
            <FloatingTitleTextInputField
              attrName='username'
              title='Gebruikersnaam'
              value={this.state.username}
              multi={false}
              length={14}
              autoFocus={true}
              height={50}
              updateMasterState={this._updateMasterState}
            />
            <Text style={styles.helpText}>Jouw volledige naam in ons systeem.</Text>
            <FloatingTitleTextInputField
              attrName='name'
              title='Volledige naam'
              value={this.state.name}
              multi={false}
              autoFocus={true}
              autoFocus={true}
              height={50}
              updateMasterState={this._updateMasterState}
            />
            <Text style={styles.helpText}>Jouw insuline dat bij ons bekend is.</Text>
            <FloatingTitleTextInputField
              attrName='insulinsensitivity'
              title='Insuline waarde'
              value={this.state.insulinsensitivity}
              multi={false}
              autoFocus={true}
              autoFocus={true}
              height={50}
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
            <Text style={styles.PayTitle}>Oops!</Text>
            <Text style={styles.subTitle2}>
              Je hebt geen toestemming om jouw gegevens aan te passen.
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
                    backgroundColor: "#1976d2",
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
