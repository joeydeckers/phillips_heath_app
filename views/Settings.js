import React, { Component } from 'react';
import { StyleSheet, View, Text, Animated, SafeAreaView, Dimensions, TouchableOpacity, StatusBar, AsyncStorage, ScrollView, Image, Linking, NativeModules } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';

export default class Settings extends Component {

    static navigationOptions = {
        header: null,
    };

    removeToken = async () => {
        const userToken = await AsyncStorage.removeItem('userToken');
        this.props.navigation.navigate('Login');
    };
    constructor(props) {
        super(props);


        this.inputRefs = {};
        this.offset = 0;
        this.state = {
            scrollOffset: new Animated.Value(0),
            email: '',
            name: '',
            insulinsensitivity: ''
        };
    }

    getUserInfo = async () => {
        const userToken = await AsyncStorage.getItem('userToken');
        axios.get('https://hypefash.com/public/api/v1/client/info?sid=' + JSON.parse(userToken))
            .then((response) => {
                this.setState({
                    email: response.data.email || "Geen email",
                    name: response.data.name || "Geen naam",
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

    render() {

        const { scrollOffset } = this.state;
        const screenWidth = Dimensions.get('window').width;

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
                    <Animated.Text
                        onLayout={e => {
                            if (this.offset === 0 && this.state.titleWidth === 0) {
                                const titleWidth = e.nativeEvent.layout.width;
                                this.setState({ titleWidth });
                            }
                        }}
                        style={{
                            fontWeight: 'bold',
                            fontSize: scrollOffset.interpolate({
                                inputRange: [0, 200],
                                outputRange: [35, 25],
                                extrapolate: 'clamp',
                            }),
                        }}>
                        Mijn account
          </Animated.Text>
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
                    <View style={{ height: 40, width: '100%' }}></View>
                    <View style={styles.containerItems}>
                        <TouchableOpacity style={styles.containerItemTop} onPress={() => this.props.navigation.navigate('PersonalInfo')}>
                            <View style={{ justifyContent: 'flex-start', flexDirection: 'row' }}>
                                <View style={styles.iconWidth}>
                                    <Icon name={'user'} solid size={20} color='#000' />
                                </View>
                                <Text style={styles.itemText}>Mijn gegevens</Text>
                            </View>
                            <View>
                                <Icon style={{ justifyContent: 'flex-end' }} name={'chevron-right'} solid size={18} color='#000'></Icon>
                            </View>
                        </TouchableOpacity>


                        <TouchableOpacity style={styles.containerItemBottom} onPress={() => this.props.navigation.navigate('Home')}>
                            <View style={{ justifyContent: 'flex-start', flexDirection: 'row' }}>
                                <View style={styles.iconWidth}>
                                    <Icon name={'heartbeat'} solid size={20} color='#000' />
                                </View>
                                <Text style={styles.itemText}>Mijn waardes</Text>
                            </View>
                            <View>
                                <Icon style={{ justifyContent: 'flex-end' }} name={'chevron-right'} solid size={18} color='#000'></Icon>
                            </View>
                        </TouchableOpacity>
                    </View>


                    <View style={styles.containerItemsLast}>
                        <TouchableOpacity style={styles.containerItemTop} onPress={() => this.props.navigation.navigate('Chat')}>
                            <View style={{ justifyContent: 'flex-start', flexDirection: 'row' }}>
                                <View style={styles.iconWidth}>
                                    <Icon name={'headset'} solid size={20} color='#000' />
                                </View>
                                <Text style={styles.itemText}>Support</Text>
                            </View>
                            <View>
                                <Icon style={{ justifyContent: 'flex-end' }} name={'chevron-right'} solid size={18} color='#000'></Icon>
                            </View>
                        </TouchableOpacity>



                        <TouchableOpacity style={styles.containerItem} onPress={() => { Linking.openURL('https://google.com') }}>
                            <View style={{ justifyContent: 'flex-start', flexDirection: 'row' }}>
                                <View style={styles.iconWidth}>
                                    <Icon name={'info-circle'} solid size={20} color='#000' />
                                </View>
                                <Text style={styles.itemText}>Over ons</Text>
                            </View>
                            <View>
                                <Icon style={{ justifyContent: 'flex-end' }} name={'chevron-right'} solid size={18} color='#000'></Icon>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.containerItemBottom} onPress={this.removeToken}>
                            <View style={{ justifyContent: 'flex-start', flexDirection: 'row' }}>
                                <View style={styles.iconWidth}>
                                    <Icon name={'unlink'} solid size={20} color='#000' />
                                </View>
                                <Text style={styles.itemText}>Uitloggen</Text>
                            </View>
                            <View>
                                <Icon style={{ justifyContent: 'flex-end' }} name={'chevron-right'} solid size={18} color='#000'></Icon>
                            </View>
                        </TouchableOpacity>

                    </View>


                </ScrollView>


            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 20,
        paddingTop: 10,
        backgroundColor: '#fff'
    },
    containerItems: {
        marginBottom: 30,
        top: -30,
        textAlignVertical: 'center'
    },
    containerItemsLast: {
        top: -30,
        textAlignVertical: 'center'
    },
    iconWidth: {
        width: 30,
        alignItems: 'center',
        marginRight: 10
    },
    itemText: {
        fontWeight: '600',
        fontSize: 16
    },
    containerItemTop: {
        backgroundColor: '#f5f5f5',
        padding: 20,
        textAlignVertical: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        width: '100%',
        borderBottomColor: '#fff',
        borderBottomWidth: 1,
    },
    containerItem: {
        backgroundColor: '#f5f5f5',
        padding: 20,
        textAlignVertical: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        borderBottomColor: '#fff',
        borderBottomWidth: 1,
    },
    containerItemBottom: {
        backgroundColor: '#f5f5f5',
        padding: 20,
        textAlignVertical: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        width: '100%',
    },
    headerTitle: {
        fontSize: 35,
        marginTop: 30,
        fontWeight: "bold",
        paddingBottom: 20
    },
    containerProfile: {
        position: 'relative',
    },
    coverImage: {
        position: 'relative',
        backgroundColor: '#eee',
        height: 150,
        borderRadius: 10,
        width: '100%',
    },
    profileButtonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        textAlign: 'center',
        bottom: 25,
        marginLeft: 35,
        marginRight: 0,
        width: '100%',
        color: "#fff",


    },
    profileButton: {
        backgroundColor: '#eee',
        padding: 13,
        fontWeight: 'bold',
        textAlign: 'center',
        borderRadius: 10,
        bottom: 0,
        width: '100%'
    },
    avatarImage: {
        height: 130,
        width: 130,
        top: -70,
        left: 20,
        justifyContent: 'flex-start',
        borderRadius: 65,
        borderColor: '#fff',
        borderWidth: 1,
        backgroundColor: '#bdbdbd'
    },
    changeProfileBackground: {
        position: 'absolute',
        top: 100,
        right: 10,
        backgroundColor: '#eee',
        padding: 10,
        borderColor: '#fff',
        borderWidth: 1.5,
        borderRadius: 10,
        zIndex: 9,
    },
    changeProfile: {
        position: 'absolute',
        top: 22,
        borderColor: '#fff',
        borderWidth: 1.5,
        left: 110,
        backgroundColor: '#eee',
        padding: 10,
        borderRadius: 50,
        zIndex: 9,
    },
    modal: {
        height: 230,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20
    },
    modalTitle: {
        fontSize: 25,
        fontWeight: "bold",
        textAlign: 'center'
    },
    modalText: {
        fontSize: 17,
        marginTop: 20,
        fontWeight: '400',
    },
    button: {
        padding: 15,
        paddingRight: 60,
        paddingLeft: 70,
        borderRadius: 10
    },
    versionNumber: {
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 50
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
});
