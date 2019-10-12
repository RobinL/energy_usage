let constants = {}

const template_dict = {
    "conversion": null,
    "sources": []
}

function shallow_copy(obj) {
    return Object.assign({}, obj);
}


// Distances
constants["kilometers"] = {
    "meters": {
        "conversion": 1000,
        "sources": [],
    },
    "miles": {
        "conversion": 0.621371,
        "sources": [{"url": "www.google.com/search?q=one+km+in+miles", "notes": null}],

    }
}

// // Volumes
constants["litres"] = {
    "imperial_gallons": {
        "conversion": 0.219969204701183,
        "sources": [{"url": "www.google.com/search?q=one+litre+in+imperial+gallons", "notes": null}],
    },
    "us_gallons": {
        "conversion": 0.264172,
        "sources": [{"url": "www.google.com/search?q=one+litre+in+us+gallons", "notes": null}],
    },
    "oil_barrels": {
        "conversion": 0.00628981,
        "sources": [{"url": "www.google.com/search?q=one+litre+in+oil+barrel", "notes": null}],
    } //q=one+litre+in+oil+barrel
}

// Units of energy
constants["joules"] = {
    "kilocalories": {
        "conversion": 1 / 4184,
        "sources": [{"url": "www.google.com/search?q=one+joule+in+kilocalories", "notes": null}],
    }
}

constants["kilowatt_hours"] = {
    "megawatt_hours": {
        "conversion": 1 / 1000,
        "sources": [],
    },
    "joules": {
        "conversion": (60 * 60 * 1000),
        "sources": [],
    },
    "kg_co2_from_grid_electricity": {
        "conversion": 0.25358,
        "sources": [{"url": "https://gist.github.com/RobinL/2d253d1b5a4a27e563fd1ce811c1bb86#file-defra_conversion_factors_2019-csv-L1928", "notes": null}],
    }
}


constants["kwh_potential_solar_schools_energy"] = {
    "gbp": {
        "conversion": 2.2e6 / 1945,
        "sources": [{"url": "https://schools-energy-coop.co.uk/wp-content/uploads/2019/08/Schools-Energy-Annual-Report-2019.pdf", "notes": null}],
    }

}

constants["residential_solar_uk_kwh_potential_capacity"] = {
    "kwh_generated_per_year": {
        "conversion": 1447169 / 1945,
        "sources": [{"url": "https://schools-energy-coop.co.uk/wp-content/uploads/2019/08/Schools-Energy-Annual-Report-2019.pdf", "notes": null}],
    }
}

constants["megawatt_hours"] = {
    "gigawatt_hours": {
        "conversion": 1 / 1000,
        "sources": [],
    },
    "gbp_to_generate_offshore_wind_uk": {
        "conversion":40,
        "sources": [{"url": "https://www.theguardian.com/environment/2019/sep/20/new-windfarms-taxpayers-subsidies-record-low", "notes": null}],
    },
    "gbp_to_generate_solar_nevada_usa": {
        "conversion": 23.76 * 0.79,
        "sources": [{"url": "https://earther.gizmodo.com/solar-just-hit-a-record-low-price-in-the-u-s-1826830592", "notes": null},
                    {"url": "https://www.google.com/search?q=google+one+dollar+in+gbp", "notes": null}],
    },
    "gbp_to_generate_nuclear_hinkley_point_uk": {
        "conversion": 92.50,
        "sources": [{"url": "https://en.wikipedia.org/w/index.php?title=Hinkley_Point_C_nuclear_power_station&oldid=918854599", "notes": null}],

    },
    // console.log("--")
    // console.log("cost of kwh pot")
    // console.log(constants["kwh_potential_solar_schools_energy"]["gbp"]["conversion"])
    // console.log("kwhs per pot")
    // console.log(constants["residential_solar_uk_kwh_potential_capacity"]["kwh_generated_per_year"]["conversion"] * 20)
    // console.log("cost of kwh")
    // console.log(constants["kwh_potential_solar_schools_energy"]["gbp"]["conversion"] / (constants["residential_solar_uk_kwh_potential_capacity"]["kwh_generated_per_year"]["conversion"] * 20))
    // console.log("--")
    "gbp_to_generate_solar_schools_energy": {
        "conversion": 1000*constants["kwh_potential_solar_schools_energy"]["gbp"]["conversion"] / (constants["residential_solar_uk_kwh_potential_capacity"]["kwh_generated_per_year"]["conversion"] * 20),
        "sources": [{ "url": "https://schools-energy-coop.co.uk/wp-content/uploads/2019/08/Schools-Energy-Annual-Report-2019.pdf", "notes": "Assumes lifetime of solar panels installed on UK schools is about 20 years."}],
    }
}


// // Energy densities
constants["litres_petrol"] = {
    "kilowatt_hours": {
        "conversion": 9.5727,
        "sources": [{"url": "https://en.wikipedia.org/wiki/Energy_density", "notes": null},
                    { "url": "Energy Saving Trust Conversion Factors 2016", "notes": null}],
    }, //
    "imperial_gallons_petrol": constants["litres"]["imperial_gallons"],
    "kg_co2_from_petrol": {
        "conversion": 2.19585,
        "sources": [{"url": "https://gist.github.com/RobinL/2d253d1b5a4a27e563fd1ce811c1bb86#file-defra_conversion_factors_2019-csv-L236", "notes": null}],
    }
}


// Energy densities
constants["litres_jet_fuel"] = {
    "joules": {
        "conversion": 35e6,
        "sources": [{"url": "https://en.wikipedia.org/wiki/Energy_density", "notes": null}],
    },
    "kg_co2_from_jet_fuel": {
        "conversion": 2.51772,
        "sources": [{"url": "https://gist.github.com/RobinL/2d253d1b5a4a27e563fd1ce811c1bb86#file-defra_conversion_factors_2019-csv-L108", "notes": null}], //   'which gives CO2 emissions from a Boeing 737-400 of 115 g per passenger km,
    }
}

constants["metric_gas_units"] = {
    "joules": {
        "conversion": 39.5e6,
        "sources": [{"url": "https://www.gov.uk/guidance/gas-meter-readings-and-bill-calculation", "notes": null}],
    },
    "kg_co2_from_domestic_gas": {
        "conversion": 2.0268,
        "sources": [{"url": "https://gist.github.com/RobinL/2d253d1b5a4a27e563fd1ce811c1bb86#file-defra_conversion_factors_2019-csv-L60", "notes": null}],
    }
}

constants["imperial_gas_units"] = {
    "metric_gas_units": {
        "conversion": 2.83,
        "sources": [{"url": "https://www.gov.uk/guidance/gas-meter-readings-and-bill-calculation", "notes": null}],
    }
}




// Time constants
constants["years"] = {
    "days": {
        "conversion": 365.25,
        "sources": [],
    },
    "months": {
        "conversion": 12,
        "sources": [],
    }
}

constants["weeks"] = {
    "days": {
        "conversion": 7,
        "sources": [],
    }
}

constants["days"] = {
    "hours": {
        "conversion": 24,
        "sources": [],
    }
}

constants["hours"] = {
    "minutes": {
        "conversion": 60,
        "sources": [],
    }
}

constants["minutes"] = {
    "seconds": {
        "conversion": 60,
        "sources": [],
    }
}




// Also include the inverse of all conversions
Object.keys(constants).forEach(from_key => {
    let this_constant = constants[from_key]
    Object.keys(this_constant).forEach(to_key => {
        constants[to_key] = constants[to_key] || {}
        constants[to_key][from_key] = shallow_copy(template_dict)
        constants[to_key][from_key]["conversion"] = 1 / constants[from_key][to_key]["conversion"]
        constants[to_key][from_key]["sources"] = [...constants[from_key][to_key]["sources"]]

    })
});

// console.log(JSON.stringify(constants, null, 4))


// Include in sources a 'from_to' key
Object.keys(constants).forEach(from_key => {
    let this_obj = constants[from_key]
    Object.keys(this_obj).forEach(to_key => {
        // console.log("---")
        // console.log(from_key)
        // console.log(to_key)

        let this_sources = [...this_obj[to_key]["sources"]]

        if (this_sources.length == 0 ) {
            this_sources = [{}]
        }
        this_sources.forEach(function(d)  {
            d["from_to"] = `${from_key} -> ${to_key}`
        })
        constants[from_key][to_key]["sources"] = this_sources
        // console.log(constants[from_key][to_key]["sources"])
    })

})
// console.log(JSON.stringify(constants["metric_gas_units"], null, 4))


// THE PROBLEM IS THAT THE CONSTATS ARRAY EVOLVES AS THIS RUNS, WHICH MEANS THAT NEW WEIRD PATHS BECOME AVAILABLE
//  SO THE PATH FOR IMPERIAL_GAS_UNITS TO HINKLEY_POINT IS
// 'gbp_to_generate_nuclear_hinkley_point_uk',
//     'megawatt_hours',
//     'gigawatt_hours',
//     'gbp_to_generate_offshore_wind_uk',
//     'gbp_to_generate_solar_nevada_usa',
//     'kilowatt_hours',
//     'joules',
//     'kilocalories',
//     'litres_jet_fuel'
// WHICH IS INEFFICIENT!
// SOLUTION IS TO CREATE A NEW CONSTANTS RATHER THAN MODIFY EXISTING

//
function follow_path(start_key, from_key, to_key, multiplier, path, sources) {
    // Multiplier is the constant computed so far
    // Want from_key to stay constant as we traverse, passing through iteratively updated multiplier
    // Intermediate from_keys will be picked up on a different start_key iteration

    // Prevent circular chains by keeping track of path taken
    path.push(from_key)


    if (to_key in constants) { // then to_key is also a from_key and chaining is possible

        // sources = [...sources, ...constants[from_key][to_key]["sources"]]
        // Update multiplier with current conversion
        multiplier = multiplier * constants[from_key][to_key]["conversion"]

        let conversions = constants[to_key]

        Object.keys(conversions).forEach(inner_key => {

            // To prevent 'circular' conversions e.g. litres_petrol -> joules -> litres_jet_fuel -> joules
            if (!(path.includes(inner_key))) {

                if (!(inner_key in constants[start_key])) { //If there isn't already a entry for this inner_key

                    constants[start_key][inner_key] = shallow_copy(template_dict)
                    constants[start_key][inner_key]["conversion"] = multiplier * constants[to_key][inner_key]["conversion"]

                    sources = [...sources, ...constants[to_key][inner_key]["sources"]]

                    constants[start_key][inner_key]["sources"] = sources

                    if (start_key == "gbp_to_generate_nuclear_hinkley_point_uk") {
                        if(inner_key == "imperial_gas_units") {
                            console.log("---")

                            console.log(path)
                            // console.log(constants[to_key][inner_key]["sources"])


                    }}
                    // }
                    follow_path(start_key, to_key, inner_key, multiplier, [...path], [...sources])

                }
            }
        });
    }
}

Object.keys(constants).forEach(from_key => {
    let from_val = constants[from_key]
    Object.keys(from_val).forEach(to_key => {
        follow_path(from_key, from_key, to_key, 1, [], [])
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

    if (from == to) {
        return 1
    }

    if (!(from in constants)) {
        let units_available = Object.keys(constants).join(", ")
        throw (`your from unit ${from} does not exist in our conversions table. Units available are ${units_available}`)
    }

    if (!(to in constants)) {
        let units_available = Object.keys(constants).join(", ")
        throw (`your from unit ${from} does not exist in our conversions table. Units available are ${units_available}`)
    }

    return constants[from][to]["conversion"]

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