import { utils } from './utils.js'

function miles_driven_per_year_to_gallons_of_fuel_per_day(miles_driven_per_year, mpg = 30) {
    let miles_per_day = miles_driven_per_year / 365.25
    return miles_per_day / mpg
}

function gallons_of_fuel_to_joules(imperial_gallons) {

    let joules_per_litre = 32000000  // from https://energyeducation.ca/encyclopedia/Joule, https://hypertextbook.com/facts/2006/TatyanaNektalova.shtml
    let joules_per_gallon = joules_per_litre * 4.54609 //imperial gallon conversion from google

    return joules_per_gallon * imperial_gallons
}

function gallons_of_fuel_to_kwh(imperial_gallons) {
    let joules = gallons_of_fuel_to_joules(imperial_gallons)
    return utils.joules_to_kwh(joules)
}

function miles_driven_per_year_to_kwh_per_day(miles_driven_per_year, mpg = 30) {
    let imperial_gallons = miles_driven_per_year_to_gallons_of_fuel_per_day(miles_driven_per_year, mpg)
    let kwh = gallons_of_fuel_to_kwh(imperial_gallons)
    return kwh
}

export let driving = {
    'miles_driven_per_year_to_kwh_per_day': miles_driven_per_year_to_kwh_per_day
};