import { utils } from './utils.js'

function kwh_required_by_dogs_per_day(weight_in_kg) {
    // Sources:
    // Energy requirements of adult dogs https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4196927/
    // 142.8655.3 kcal.kgBW20.75.day21


    let energy_required_per_day_in_kcal = 143 * (weight_in_kg**0.75)

    // How much energy is required to produce on cal of food?
    // https://www.ebikes.ca/documents/Ebike_Energy.pdf
    // See also https://blogs.scientificamerican.com/plugged-in/10-calories-in-1-calorie-out-the-energy-we-spend-on-food/ for a higher estimate
    let food_production_multiplier = 7

    let energy_reqired_to_produce_food_in_kcal = energy_required_per_day_in_kcal * food_production_multiplier

    let energy_in_joules = utils.JOULES_PER_KCAL * energy_reqired_to_produce_food_in_kcal

    let energy_in_kwh = utils.joules_to_kwh(energy_in_joules)

    return energy_in_kwh

}

export let pets = {
    'kwh_required_by_dogs_per_day': kwh_required_by_dogs_per_day
};