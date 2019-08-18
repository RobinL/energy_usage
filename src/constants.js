
let constants = {}

// Where URL params are specified, the source is a google serach
// e.g. q=one+km+in+miles is www.google.com/search?q=one+km+in+miles


// Distances
constants["kilometers"] = {
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
    ["kilowatt_hours"]: 1/(60*60*1000)
}

// Energy densities
constants["litres_petrol"] = {
    "joules": 34.2e6 //https://en.wikipedia.org/wiki/Energy_density
}

// Energy densities
constants["litres_jet_fuel"] = {
    "joules": 35e6 //https://en.wikipedia.org/wiki/Energy_density
}

constants["imperial_gas_unit"] = {
    "kilowatt_hours": (39.5 / 3.6) * 2.83 // https://www.gov.uk/guidance/gas-meter-readings-and-bill-calculation
}

constants["metric_gas_unit"] = {
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
let inverse_constants = {}
Object.keys(constants).forEach(from_key => {
    let this_constant = constants[from_key]

    Object.keys(this_constant).forEach(to_key => {
        inverse_constants[to_key] = inverse_constants[to_key] || {}
        inverse_constants[to_key][from_key] = 1 / constants[from_key][to_key]
    })
});

constants = Object.assign({}, constants, inverse_constants);


function follow_path(start_key, from_key, to_key, multiplier, depth, path) {
    // Multiplier is the constant multiplier computed so far
    // Want from_key to stay constant as we traverse, passing through current conversion
    // Intermediate keys will be picked up on a different start_key iteration

    // TODO: I don't think depth should be needed
    // Instead we just need to check we're not 'self converting' e.g. joules to joules
    depth += 1
    if (depth > 10) {return}
    path.push(from_key)

    // console.log(`----following from start ${start_key} from key ${from_key} to  ${to_key}`)

    // debugger;

    if (to_key in constants) {// then to_key is also a from_key and chaining is possible

        // Update multiplier with current conversion to pass into follow_path
        multiplier = multiplier * constants[from_key][to_key]

        // for chain_key in to_key
        let conversions = constants[to_key]

        // console.log(`--chaining possible through from_key ${from_key} ${to_key} ${JSON.stringify(conversions)}`)

        // How to prevent 'circular' conversions e.g. litres_petrol -> joules -> litres_jet_fuel -> joules

        Object.keys(conversions).forEach(inner_key => {

            // if (!(path.includes(inner_key))) {
                // console.log(`ADDING CHAIN ${start_key} to ${inner_key} with ${multiplier * constants[to_key][inner_key]}`)

                new_constants[start_key] = new_constants[start_key] || {}
                new_constants[start_key][inner_key] = multiplier * constants[to_key][inner_key]

                // Making this conditional on this path not already existing
                follow_path(start_key, to_key, inner_key, multiplier, depth, path)
            // }
        });
    }
}

let new_constants = {}

Object.keys(constants).forEach(from_key => {
    // console.log(`======constants key ${from_key}`)
    let from_val = constants[from_key]
    Object.keys(from_val).forEach(to_key => {
        // console.log(`===constants to key ${to_key}`)
        follow_path(from_key, from_key, to_key, 1, 1, [])
    })
});

constants = Object.assign({}, constants, new_constants);




// function convert_units()
// Converts abbreviations into full names
// Raises errors when not possible

console.log(constants)

