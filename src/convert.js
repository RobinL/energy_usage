
let constants = {}

// Where URL params are specified, the source is a google serach
// e.g. q=one+km+in+miles is www.google.com/search?q=one+km+in+miles

// Distances
constants["kilometers"] = {
    "meters": 1000,
    "miles": 0.621371  //q=one+km+in+miles
}

// Volumes
constants["litres"] = {
    "imperial_gallons": 0.219969204701183, //?q=one+litre+in+imperial+gallons
    "us_gallons": 0.264172, //q=one+litre+in+us+gallons
    "oil_barrels": 0.00628981 //q=one+litre+in+oil+barrel
}

// Units of energy
constants["joules"] = {
    ["kilocalories"]: 1 / 4184, //q=one+joule+in+kilocalories
    ["kilowatt_hours"]: 1 / (60 * 60 * 1000)
}

// Energy densities
constants["litres_petrol"] = {
    "joules": 34.2e6, //https://en.wikipedia.org/wiki/Energy_density,
    "imperial_gallons_petrol": constants["litres"]["imperial_gallons"]
}


// Energy densities
constants["litres_jet_fuel"] = {
    "joules": 35e6 //https://en.wikipedia.org/wiki/Energy_density
}

constants["imperial_gas_units"] = {
    "kilowatt_hours": (39.5 / 3.6) * 2.83 // https://www.gov.uk/guidance/gas-meter-readings-and-bill-calculation
}

constants["metric_gas_units"] = {
    "kilowatt_hours": (39.5 / 3.6)// https://www.gov.uk/guidance/gas-meter-readings-and-bill-calculation
}

// Time constants
constants["years"] = {
    "days": 365.25,
    "months": 12
}

constants["weeks"] = {
    "days": 7
}

constants["days"] = {
    "hours": 24
}

constants["hours"] = {
    "minutes": 60
}

constants["minutes"] = {
    "seconds": 60
}

// Also include the inverse of all conversions
Object.keys(constants).forEach(from_key => {
    let this_constant = constants[from_key]
    Object.keys(this_constant).forEach(to_key => {
        constants[to_key] = constants[to_key] || {}
        constants[to_key][from_key] = 1 / constants[from_key][to_key]
    })
});

function follow_path(start_key, from_key, to_key, multiplier, path) {
    // Multiplier is the constant computed so far
    // Want from_key to stay constant as we traverse, passing through iteratively updated multiplier
    // Intermediate from_keys will be picked up on a different start_key iteration

    // Prevent circular chains by keeping track of path taken
    path.push(from_key)

    if (to_key in constants) {// then to_key is also a from_key and chaining is possible

        // Update multiplier with current conversion
        multiplier = multiplier * constants[from_key][to_key]

        let conversions = constants[to_key]


        Object.keys(conversions).forEach(inner_key => {

            // To prevent 'circular' conversions e.g. litres_petrol -> joules -> litres_jet_fuel -> joules
            if (!(path.includes(inner_key))) {

                if (!(inner_key in constants[start_key])) {  //If there isn't already a entry for this inner_key
                    constants[start_key][inner_key] = multiplier * constants[to_key][inner_key]
                    follow_path(start_key, to_key, inner_key, multiplier, [...path])
                }
            }
        });
    }
}

Object.keys(constants).forEach(from_key => {
    let from_val = constants[from_key]
    Object.keys(from_val).forEach(to_key => {
        follow_path(from_key, from_key, to_key, 1, [])
    })
});


function expand_abbreviations(unit) {
    let lookup = {
        "kwh": "kilowatt_hours",
        "kcal": "kilocalories",
        "km": "kilometers",
        "j": "joules"
    }

    if (unit in lookup) {
        return lookup[unit]
    }
    return unit
}

function convert_units(from, to) {
    from = expand_abbreviations(from)
    to = expand_abbreviations(to)

    if (from == to) {return 1}

    if (!(from in constants)) {
        let units_available = Object.keys(constants).join(", ")
        throw (`your from unit ${from} does not exist in our conversions table. Units available are ${units_available}`)
    }

    if (!(to in constants)) {
        let units_available = Object.keys(constants).join(", ")
        throw (`your from unit ${from} does not exist in our conversions table. Units available are ${units_available}`)
    }

    return constants[from][to]

}

// the enables statements of the form per("kwh/joules") * joules
function per(to_over_from) {
    let s = to_over_from.split("/")
    return convert_units(s[1], s[0])
}

export let convert = {
    '_constants_dict': constants,
    'convert_units': convert_units,
    'per': per
};