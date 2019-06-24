import { utils } from './utils.js'



// https://en.wikipedia.org/wiki/Energy_efficiency_in_transport

function miles_driven_to_gallons_of_fuel_per_day(miles_driven, time_period, mpg = 30) {

    let miles_per_day = utils.convert_time_period(miles_driven, time_period, "days")
    return miles_per_day / mpg
}

function gallons_of_fuel_to_joules(imperial_gallons) {

    let joules_per_litre = 34.2e6  // from https://en.wikipedia.org/wiki/Energy_density
    let joules_per_gallon = joules_per_litre * 4.54609 //imperial gallon conversion from google

    return joules_per_gallon * imperial_gallons
}

function gallons_of_fuel_to_kwh(imperial_gallons) {
    let joules = gallons_of_fuel_to_joules(imperial_gallons)
    return utils.joules_to_kwh(joules)
}

function miles_driven_to_kwh_per_day(miles_driven, time_period, mpg = 30) {
    let imperial_gallons = miles_driven_to_gallons_of_fuel_per_day(miles_driven, time_period, mpg)
    let kwh = gallons_of_fuel_to_kwh(imperial_gallons)
    return kwh
}

export let driving = {
    'miles_driven_to_kwh_per_day': miles_driven_to_kwh_per_day,
    '_miles_driven_to_gallons_of_fuel_per_day': miles_driven_to_gallons_of_fuel_per_day

};