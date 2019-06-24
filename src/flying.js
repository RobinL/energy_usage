// https://en.wikipedia.org/wiki/Airbus_A320_family shows that A320 is one of the most popular passenger planes

import { utils } from './utils.js'

function flying_miles_to_kwh(miles_flown, time_period) {

    let miles_per_day = utils.convert_time_period(miles_flown, time_period, "days")

    // A320 is quoted as 2.61 L / 100 km here: https://en.wikipedia.org/wiki/Fuel_economy_in_aircraft
    let litres_per_mile = (2.61 / 100) * 1.60934  // Google conversion factor

    let litres = miles_per_day * litres_per_mile

    let joules = litres * 35e6  // with 35e6 joules per litre quoted here: https://en.wikipedia.org/wiki/Energy_density

    return utils.joules_to_kwh(joules)

}

export let flying = {
    'flying_miles_to_kwh': flying_miles_to_kwh
};