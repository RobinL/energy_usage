import { convert } from './convert.js'

function miles_driven_to_gallons_of_fuel_per_day(miles_driven, time_period, mpg = 30) {
    let miles_per_day = miles_driven * convert.convert_units("days", time_period)
    return miles_per_day / mpg
}

function gallons_of_fuel_to_kwh(imperial_gallons) {
    let litres = convert.per("litres/imperial_gallons") * imperial_gallons
    let joules  = convert.convert_units("litres_petrol", "joules") * litres
    return convert.per("kwh/joules") * joules
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