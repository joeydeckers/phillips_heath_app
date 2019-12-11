import { AsyncStorage} from 'react-native';

let initialState = {
    isLoading: false,
    error: null,
    sid: '',
}

export default user = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_USER_INFO':
            return Object.assign({}, state, { isLoading: true })
        case 'SET_USER_INFO':
            AsyncStorage.setItem('userToken', JSON.stringify(action.payload));
            this.props.navigation.navigate('App');
            return Object.assign({}, state, { sid: action.payload, isLoading: false })
        case 'LOAD_QUOTE_FAILURE':
            alert("Gegevens zijn fout!")
            return "failed";
        
        default:
            return state
    }
}