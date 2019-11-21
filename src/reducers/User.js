// const user = (state = [], action) => {
//     switch (action.type){
//         case 'SET_USER_INFO':
//         return[
//             ...state,{
//                 sid: action.username,
//             }
//         ]
//         default:
//             return state
//     }

// }

// export default user



let initialState = {
    isLoading: false,
    error: null,
    sid: '',
}

export default quotes = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_USER_INFO':
            return Object.assign({}, state, { isLoading: true })
        case 'SET_USER_INFO':
            alert(action.payload);
            return Object.assign({}, state, { sid: action.payload, isLoading: false })
        
        default:
            return state
    }
}