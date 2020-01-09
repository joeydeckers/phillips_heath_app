import axios from 'axios'

export const nutrition = (nutritionInfo) => {

    return (dispatch, getState) => {
        dispatch({ type: 'GET_USER_INFO' })
        return axios.post('https://pivoxa.nl/public/api/v1/client/insulin/calculate',{
            carbs: nutritionInfo.carbs,
            actualbloodsugar: nutritionInfo.actualBloodSugar,
            differencebloodsugar: nutritionInfo.targetBloodSugar,
            sid: nutritionInfo.sid
        })
        .then(function (response) {
            console.log(response);
            //alert(response.data.sid);
            dispatch({ type: 'GET_BLOOD_DOSE', 
            payload:{ 
                baseDose: response.data[0].baseDose ,
                diffrenceBloodSugar: response.data[0].diffrenceBloodSugar,
                correctionDose: response.data[0].correctionDose,
                fullDose: response.data[0].fullDose
            }})
            console.log(response);
        }).catch(function (error) {
            dispatch({ type: 'LOAD_QUOTE_FAILURE', payload: error })
        })
    }

}