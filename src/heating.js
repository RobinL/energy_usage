import { convert } from './convert.js'

//This is derived from https://observablehq.com/@robinl/derive-effect-of-changing-thermometer-on-kwh-requirements
let relative_heat_requirements = [{ "thermostat": 0, "heat_required": 0 }, { "thermostat": 1, "heat_required": 0 }, { "thermostat": 2, "heat_required": 0.37571428571428567 }, { "thermostat": 3, "heat_required": 5.0985714285714305 }, { "thermostat": 4, "heat_required": 26.044285714285724 }, { "thermostat": 5, "heat_required": 78.48999999999997 }, { "thermostat": 6, "heat_required": 169.6057142857142 }, { "thermostat": 7, "heat_required": 287.250238095238 }, { "thermostat": 8, "heat_required": 422.87452380952385 }, { "thermostat": 9, "heat_required": 576.3630952380952 }, { "thermostat": 10, "heat_required": 754.0873809523811 }, { "thermostat": 11, "heat_required": 950.7330952380953 }, { "thermostat": 12, "heat_required": 1164.0188095238095 }, { "thermostat": 13, "heat_required": 1391.993095238095 }, { "thermostat": 14, "heat_required": 1643.9459523809514 }, { "thermostat": 15, "heat_required": 1920.8502380952373 }, { "thermostat": 16, "heat_required": 2217.6545238095227 }, { "thermostat": 17, "heat_required": 2539.715952380951 }, { "thermostat": 18, "heat_required": 2889.3630952380945 }, { "thermostat": 19, "heat_required": 3252.295952380951 }, { "thermostat": 20, "heat_required": 3618.2802380952367 }, { "thermostat": 21, "heat_required": 3984.280238095237 }, { "thermostat": 22, "heat_required": 4350.280238095237 }, { "thermostat": 23, "heat_required": 4716.280238095237 }, { "thermostat": 24, "heat_required": 5082.280238095236 }, { "thermostat": 25, "heat_required": 5448.280238095238 }, { "thermostat": 26, "heat_required": 5814.280238095238 }, { "thermostat": 27, "heat_required": 6180.280238095238 }, { "thermostat": 28, "heat_required": 6546.28023809524 }, { "thermostat": 29, "heat_required": 6912.28023809524 }]

function get_thermostat_adjustment(thermostat_current, thermostat_future) {
    let current = relative_heat_requirements.filter(function (d) {
        return d["thermostat"] == thermostat_current
    })

    current = current[0]["heat_required"]

    let future = relative_heat_requirements.filter(function (d) {
        return d["thermostat"] == thermostat_future
    })
    future = future[0]["heat_required"]

    return future/current

}

function heating_kwh_per_day(annual_usage_from_energy_bill, thermostat_current, thermostat_future, num_in_household, units = "kwh") {
    let kwh_per_year = convert.convert_units(units, "kwh") * annual_usage_from_energy_bill

    let kwh_per_day = kwh_per_year * convert.per("years/days")

    // TODO: improve this adjustment
    kwh_per_day = kwh_per_day * 0.8  //Fairly arbitrary adjustment to account for gas usage for cooking, hot water
    kwh_per_day = kwh_per_day/num_in_household

    // Adjust for future thermostat settings
    kwh_per_day = kwh_per_day * get_thermostat_adjustment(thermostat_current, thermostat_future)

    return kwh_per_day

}

export let heating = {
    'heating_kwh_per_day': heating_kwh_per_day,
    '_get_thermostat_adjustment': get_thermostat_adjustment
};