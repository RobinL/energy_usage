
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

function kwh_per_washing_machine_cycle(degrees_centigrate) {
    let degrees_centigrate_string = degrees_centigrate + ""

    if (!(degrees_centigrate_string in Object.keys(WASHING_KWH_LOOKUP))) {
        throw "No data available for the temperature you chose"
    }

    return WASHING_KWH_LOOKUP[degrees_centigrate_string]

}

function kwh_per_dishwasher_cycle(degrees_centigrate) {
    let degrees_centigrate_string = degrees_centigrate + ""

    if (!(degrees_centigrate_string in Object.keys(DISHWASHER_KWH_LOOKUP))) {
        throw "No data available for the temperature you chose"
    }

    return DISHWASHER_KWH_LOOKUP[degrees_centigrate_string]

}

export let washing = {
    'kwh_per_washing_machine_cycle': kwh_per_washing_machine_cycle,
    'kwh_per_dishwasher_cycle': kwh_per_dishwasher_cycle

}