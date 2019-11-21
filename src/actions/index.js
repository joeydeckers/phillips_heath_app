// export const register = () => {
//     return (dispatch, getState) => {

//         dispatch({ type: 'SET_USER_INFO' })
//         axios.get('https://breaking-bad-quotes.herokuapp.com/v1/quotes').then(function (response) {
//             console.log(response)
//             dispatch({ type: 'LOAD_QUOTE_SUCCESS', payload: response.data[0].quote })

//         }).catch(function (error) {
//             dispatch({ type: 'LOAD_QUOTE_FAILURE', payload: error })
//         })
//     }
// }


import axios from 'axios'

export const login = (user) => {

    return (dispatch, getState) => {

        dispatch({ type: 'GET_USER_INFO' })
        axios.post('http://hypefash.com/public/api/v1/client/login',{
            username: user.username,
            password: user.password
        })
        .then(function (response) {
            alert(response.data.sid)
            dispatch({ type: 'SET_USER_INFO', payload: response.data.sid })

        }).catch(function (error) {
            dispatch({ type: 'LOAD_QUOTE_FAILURE', payload: error })
        })
    }

}