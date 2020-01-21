import React, { Component } from 'react';
import { AsyncStorage, StyleSheet, View, Text, TextInput, Dimensions, TouchableOpacity, ActivityIndicator, StatusBar, Keyboard } from 'react-native';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';
import Modal from "react-native-modalbox";
import Icon from 'react-native-vector-icons/Feather';
import SafeAreaView from 'react-native-safe-area-view';
var screen = Dimensions.get("window");

class Login extends Component {

    state = {
        loginUsername: '',
        loginPassword: '',
        loadingButton: false,
        isOpenModal: false,
        keyboardState: 'closed',
        errorMessage: ''
    }


    loginUsernameHandler = val => {
        this.setState({
            loginUsername: val
        });
    }

    loginPasswordHandler = val => {
        this.setState({
            loginPassword: val
        })
    }

    _keyboardDidShow = () => {
        this.setState({
            keyboardState: 'opened'
        });
    }

    _keyboardDidHide = () => {
        this.setState({
            keyboardState: 'closed'
        });
    }

    componentWillMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    loginUser = () => {
        this.setState({
            loadingButton: true
        })

        axios.post('https://hypefash.com/public/api/v1/client/login', {
            username: this.state.loginUsername,
            password: this.state.loginPassword
        })
            .then((response) => {
                this.setState({
                    loadingButton: false
                })
                if (response.data.success) {
                    AsyncStorage.setItem('userToken', JSON.stringify(response.data.sid));
                    this.props.navigation.navigate('App');
                }
                else {
                    this.setState({
                        isOpenModal: true,
                        errorMessage: 'Je ingevoerde gegevens zijn niet juist.'
                    })

                }
            })
            .catch((error) => {
                this.setState({
                    loadingButton: false,
                    isOpenModal: true,
                    errorMessage: 'Er is iets fout gegaan. Probeer later opnieuw.'
                })
            })
    }
    static navigationOptions = {
        header: null,
    };


    getStatus() {
        if (this.state.loadingButton == false) {
            return (
                <TouchableOpacity style={styles.loginButton} onPress={this.loginUser}>
                    <Text style={styles.loginButtonText}>Inloggen</Text>
                </TouchableOpacity>
            );
        }
        else {
            return (
                <TouchableOpacity style={styles.loginButton}>
                    <View
                        style={{
                            flexDirection: "row",
                            display: "flex",
                            justifyContent: "center",
                            maxWidth: '100%'
                        }}
                    >
                        <View
                            style={{

                                justifyContent: "flex-start",
                                flexDirection: "row"
                            }}
                        >
                            <ActivityIndicator size="large" color="#fff" />
                        </View>
                        <View
                            style={{
                                justifyContent: "flex-start",
                                flexDirection: "row"
                            }}
                        >
                            <Text style={styles.loginButtonText}>Aan het inloggen</Text>
                        </View>


                    </View>
                </TouchableOpacity>
            );
        }
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="dark-content" backgroundColor="#fff" translucent={false} />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text style={styles.headerTitle}>Log hier met {"\n"}je gegevens in </Text>
                    <View style={styles.formContainer}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Uw gebruikersnaam"
                            value={this.getUserInfo}
                            onSubmitEditing={Keyboard.dismiss}
                            autoFocus={true}
                            autoCapitalize='none'
                            value={this.state.loginUsername}
                            onChangeText={this.loginUsernameHandler}
                        />
                        <TextInput
                            style={styles.textInput}
                            placeholder="Uw wachtwoord"
                            secureTextEntry={true}
                            onSubmitEditing={Keyboard.dismiss}
                            autoCapitalize='none'
                            value={this.state.loginPassword}
                            onChangeText={this.loginPasswordHandler}
                        />
                    </View>
                    {this.getStatus()}
                </ScrollView>


                <Modal
                    coverScreen
                    isOpen={this.state.isOpenModal}
                    onClosed={() => this.setState({ isOpenModal: false })}
                    style={styles.modalContainer}
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
                        <Text style={styles.modalTitle}>Oops!</Text>
                        <Text style={styles.modalSubText}>
                            {this.state.errorMessage}
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
                                onPress={() => this.setState({ isOpenModal: false })}
                                style={[
                                    styles.modalButton,
                                    {
                                        backgroundColor: "#4486FF",
                                        flexDirection: "row",
                                        justifyContent: "center"
                                    }
                                ]}
                            >
                                <Text style={[{ color: "#fff",fontWeight: 'bold' }, styles.buttonText]}>
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
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: '#fff',
        height: '100%'
    },
    headerTitle: {
        fontSize: 30,
        marginTop: 80,
        marginBottom: 20,
        fontWeight: 'bold'
    },
    textInput: {
        padding: 13,
        marginTop: 10,
        backgroundColor: '#EFEFF4',
        borderRadius: 8
    },
    loginButton: {
        backgroundColor: '#4486FF',
        width: '100%',
        marginTop: 15,
        borderRadius: 10,

    },
    loginButtonText: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold',
        padding: 14,
        fontSize: 18,
        shadowColor: "#000",
    },
    modalTitle: {
        fontSize: 25,
        fontWeight: "bold",
        textAlign: 'center'
    },
    modalSubText: {
        fontSize: 17,
        marginTop: 20,
        fontWeight: '400',
    },
    modalButton: {
        padding: 15,
        textAlign: 'center',
        borderRadius: 10,
    },
    modalContainer: {
        height: 230,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20
    },
});
export default Login