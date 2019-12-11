import NutritionLog from "../../views/NutritionLog"
import axios from 'axios'

let initialState = {
    carbs: '',
    actualBloodSugar: '',
    targetBloodSugar: '',
    sid: '$2y$10$FHIRWIw/fZdROUZt2WPkee6dZMHCVYPeo3AtLw2zzYx1NHbJdSwma',
    baseDose: '',
    diffrenceBloodSugar: '',
    correctionDose: '',
    fullDose: ''
}

export default nutrition = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_BLOOD_DOSE':
            alert(action.payload.baseDose);
            return Object.assign({}, state, { 
                baseDose: action.payload.baseDose,
                diffrenceBloodSugar: action.payload.diffrenceBloodSugar,
                correctionDose: action.payload.correctionDose,
                fullDose: action.payload.fullDose
             })
        
        default:
            return state
    }
}