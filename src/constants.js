
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


// There must be a recursive form for this algorithm
function find_implicit_conversions() {
    // Generate conversions that 'pass through' an intermediate conversion e.g. hours to minutes
    Object.keys(constants).forEach(from_key => {
        // from key is e.g. days
        let this_constant = constants[from_key]
        Object.keys(this_constant).forEach(to_key => {
            //to_key is e.g. hours

            if (to_key in constants) {
                let final_keys = constants[to_key]
                // intermediate_constants is {"minutes": 60, "seconds": 60}
                Object.keys(final_keys).forEach(final_key => {
                    // final_key is minutes
                    if (final_key != from_key) {
                        constants[from_key][final_key] = constants[from_key][to_key] * constants[to_key][final_key]
                    }
                })
            }
        })
    });
}

find_implicit_conversions()
find_implicit_conversions()
find_implicit_conversions()
find_implicit_conversions()





// function convert_units()
// Converts abbreviations into full names
// Raises errors when not possible

console.log(constants)

