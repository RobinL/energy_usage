
let constants = {}

const template_dict = {"conversion": null,
                "sources": [],
                "desc": null}

function shallow_copy(obj) {
    return Object.assign({}, obj);
}

// Where URL params are specified, the sources is a google serach
// e.g. q=one+km+in+miles is www.google.com/search?q=one+km+in+miles

// Distances
constants["kilometers"] = {
    "meters": {"conversion":1000, "sources": [], "desc": null},
    "miles": {"conversion": 0.621371, "sources": ["www.google.com/search?q=one+km+in+miles"], "desc": null}
}

// // Volumes
constants["litres"] = {
    "imperial_gallons": { "conversion": 0.219969204701183, "sources": ["www.google.com/search?q=one+litre+in+imperial+gallons"], "desc":null},
    "us_gallons": { "conversion": 0.264172, "sources": ["www.google.com/search?q=one+litre+in+us+gallons"], "desc":null},
    "oil_barrels": { "conversion": 0.00628981, "sources": ["www.google.com/search?q=one+litre+in+oil+barrel"], "desc":null} //q=one+litre+in+oil+barrel
}

// Units of energy
constants["joules"] = {
    "kilocalories": { "conversion": 1 / 4184, "sources": ["www.google.com/search?q=one+joule+in+kilocalories"], "desc":null},
    "kilowatt_hours": {"conversion" :1 / (60 * 60 * 1000), "sources":[], "desc":null}
}

constants["kilowatt_hours"] = {
    "megawatt_hours": {"conversion":1/1000, "sources":[], "desc": null}
}

constants["megawatt_hours"] = {
    "gigawatt_hours": {"conversion":1/1000, "sources":[], "desc": null}
}

// // Energy densities
constants["litres_petrol"] = {
    "kilowatt_hours": { "conversion": 0.23324, "sources": ["https://en.wikipedia.org/wiki/Energy_density", "Energy Saving Trust Conversion Factors 2016"], "desc": null}, //
    "imperial_gallons_petrol": constants["litres"]["imperial_gallons"]
}


// Energy densities
constants["litres_jet_fuel"] = {
    "joules": 35e6, //https://en.wikipedia.org/wiki/Energy_density,
    "kg_co2_jet_fuel": 3.15 //https://www.carbonindependent.org/22.html   'which gives CO2 emissions from a Boeing 737-400 of 115 g per passenger km.'
}

// constants["imperial_gas_units"] = {
//     "kilowatt_hours": (39.5 / 3.6) * 2.83 // https://www.gov.uk/guidance/gas-meter-readings-and-bill-calculation
// }

// constants["metric_gas_units"] = {
//     "kilowatt_hours": (39.5 / 3.6)// https://www.gov.uk/guidance/gas-meter-readings-and-bill-calculation
// }

// // Time constants
// constants["years"] = {
//     "days": 365.25,
//     "months": 12
// }

// constants["weeks"] = {
//     "days": 7
// }

constants["days"] = {
    "hours": {
        "conversion": 24,
        "sources": ["google_days_hours"],
        "desc": null
    }
}

constants["hours"] = {
    "minutes": {
        "conversion": 60,
        "sources": ["google_hours_minutes"],
        "desc": null
    }
}

constants["minutes"] = {
    "seconds": {
        "conversion": 60,
        "sources": ["google_minutes_seconds"],
        "desc": null}
}

// Also include the inverse of all conversions
Object.keys(constants).forEach(from_key => {
    let this_constant = constants[from_key]
    Object.keys(this_constant).forEach(to_key => {
        constants[to_key] = constants[to_key] || {}
        constants[to_key][from_key] = shallow_copy(template_dict)
        constants[to_key][from_key]["conversion"] = 1 / constants[from_key][to_key]["conversion"]
        constants[to_key][from_key]["sources"] = [...constants[from_key][to_key]["sources"]]
        constants[to_key][from_key]["desc"] = constants[from_key][to_key]["desc"]

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
        multiplier = multiplier * constants[from_key][to_key]["conversion"]

        let conversions = constants[to_key]

        Object.keys(conversions).forEach(inner_key => {

            // To prevent 'circular' conversions e.g. litres_petrol -> joules -> litres_jet_fuel -> joules
            if (!(path.includes(inner_key))) {

                if (!(inner_key in constants[start_key])) {  //If there isn't already a entry for this inner_key
                    constants[start_key][inner_key] = shallow_copy(template_dict)
                    constants[start_key][inner_key]["conversion"] = multiplier * constants[to_key][inner_key]["conversion"]
                    constants[start_key][inner_key]["sources"] = [...constants[to_key][inner_key]["sources"], ...constants[from_key][to_key]["sources"]]
                    constants[start_key][inner_key]["desc"] = constants[to_key][inner_key]["desc"]

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
        "gwh": "gigawatt_hours",
        "mwh": "megawatt_hours",
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

    if (from == to) { return 1 }

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