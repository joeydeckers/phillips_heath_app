import NutritionLog from "../../views/NutritionLog"

let initialState = {
    isLoading: false,
    error: null,
    sid: 'sid',
}

export default nutrition = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_USER_INFO':
            return Object.assign({}, state, { isLoading: true })
        case 'SET_USER_INFO':
            return Object.assign({}, state, { sid: action.payload, isLoading: false })
        
        default:
            return state
    }
}