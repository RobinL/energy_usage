import { utils } from './utils.js'

// Going to use the Mifflin-St Jeor Formula
// https://en.wikipedia.org/wiki/Basal_metabolic_rate#BMR_estimation_formulas
// https://www.ncbi.nlm.nih.gov/pubmed/15883556
// http://www.fao.org/3/y5686e/y5686e07.htm#bm07.2

function get_BMR(weight_kg, height_cm, age_years, gender) {
    // https://en.wikipedia.org/wiki/Basal_metabolic_rate#BMR_estimation_formulas
    let base = 10 * weight_kg + 6.25 * height_cm  - 5 * age_years
    let adj
    if (gender == "male") {
        adj = base +5
    } else {
        adj = base - 161
    }
    return adj
}

function get_BMR_plus_PAR_multiple(base_BMR, activity_level) {
    // https://en.wikipedia.org/wiki/Harris%E2%80%93Benedict_equation#Step_2_%E2%80%93_Determine_Total_Intake
    // http://www.fao.org/3/y5686e/y5686e07.htm#bm07.2

    let adjustments = {
        "sedentary_light": 1.53,
        "moderately_active": 1.76,
        "vigorous": 2.25
    }

    return base_BMR * adjustments[activity_level]
}

function calories_per_day(weight_kg, height_cm, age_years, gender, activity_level) {

    let base_BMR = get_BMR(weight_kg, height_cm, age_years, gender)
    let adjusted_BMR = get_BMR_plus_PAR_multiple(base_BMR, activity_level)
    return adjusted_BMR

}

function kwh_per_day(weight_kg, height_cm, age_years, gender, activity_level) {
    let calories = calories_per_day(weight_kg, height_cm, age_years, gender, activity_level)

    // How much energy is required to produce on cal of food?
    // https://www.ebikes.ca/documents/Ebike_Energy.pdf
    // See also https://blogs.scientificamerican.com/plugged-in/10-calories-in-1-calorie-out-the-energy-we-spend-on-food/ for a higher estimate
    let food_production_multiplier = 7  // Later we want to adjust for diet - e.g. veggie vs meat eating.
    let joules = calories * food_production_multiplier * utils.JOULES_PER_KCAL
    return utils.joules_to_kwh(joules)
}


export let eating = {
    'kwh_per_day': kwh_per_day,
    '_get_BMR': get_BMR
};