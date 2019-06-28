import { utils } from './utils.js'

// Derived from measuring the actual usage of my washing machine
//Manual for model WW90J5456MW http://downloadcenter.samsung.com/content/UM/201712/20171222100637120/WW5000J_BEST_DC68-03779A-01_EN.pdf
const WASHING_KWH_LOOKUP = {
    "30" : 0.7
}

// Manual for the model I own https://media3.bosch-home.com/Documents/9000399586_A.pdf
// https://www.buyersandsellers.co.uk/images/Bosch/pdf/SGV53E33GB.pdf
// This seems fairly typical for a modern machine,
// See also https://aceee.org/files/proceedings/2008/data/papers/1_123.pdf
const DISHWASHER_KWH_LOOKUP = {
    "50": 1.05
}

function washing_machine_kwh_per_day(times_run, time_period, degrees_centigrate="30") {
    let degrees_centigrate_string = degrees_centigrate + ""

    if (!(degrees_centigrate_string in WASHING_KWH_LOOKUP)) {
        throw "No data available for the temperature you chose: "  + degrees_centigrate_string

    }

    let kwh_per_wash = WASHING_KWH_LOOKUP[degrees_centigrate_string]

    let kwh_used = kwh_per_wash * times_run

    return utils.convert_time_period(kwh_used, time_period, "days")

}

function dishwasher_kwh_per_day(times_run, time_period, degrees_centigrate = "50") {
    let degrees_centigrate_string = degrees_centigrate + ""

    if (!(degrees_centigrate_string in DISHWASHER_KWH_LOOKUP)) {
        throw "No data available for the temperature you chose: " + degrees_centigrate_string
    }

    let kwh_per_wash = DISHWASHER_KWH_LOOKUP[degrees_centigrate_string]

    let kwh_used = kwh_per_wash * times_run

    return utils.convert_time_period(kwh_used, time_period, "days")

}

export let washing = {
    'washing_machine_kwh_per_day': washing_machine_kwh_per_day,
    'dishwasher_kwh_per_day': dishwasher_kwh_per_day

}