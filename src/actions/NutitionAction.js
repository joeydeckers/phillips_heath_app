import axios from 'axios'

export const nutrition = (nutritionInfo) => {

    return (dispatch, getState) => {
        dispatch({ type: 'GET_USER_INFO' })
        return axios.post('http://hypefash.com/public/api/v1/client/insulin/calculate',{
            carbs: nutritionInfo.carbs,
            actualbloodsugar: nutritionInfo.actualBloodSugar,
            differencebloodsugar: nutritionInfo.targetBloodSugar,
            sid: nutritionInfo.sid
        })
        .then(function (response) {
            //alert(response.data.sid);
            dispatch({ type: 'GET_BLOOD_DOSE', 
            payload:{ 
                baseDose: response.data[0].baseDose ,
                diffrenceBloodSugar: response.data[0].diffrenceBloodSugar,
                correctionDose: response.data[0].correctionDose,
                fullDose: response.data[0].fullDose
            }})
        }).catch(function (error) {
            dispatch({ type: 'LOAD_QUOTE_FAILURE', payload: error })
        })
    }

}