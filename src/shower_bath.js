import { convert } from './convert.js'

// ///'The specific heat capacity of water is aaround 4,200 Joules per kilogram per degree Celsius (J/kg°C).'
const water_specific_heat_capacity = 4184

function shower_get_daily_litres(num_showers, shower_length_minutes, shower_flow_millilitres_per_second) {
    return num_showers * shower_length_minutes * shower_flow_millilitres_per_second * (60/1000);
}

function shower_get_daily_kwh(num_showers, shower_length_minutes, shower_flow_litres_per_second, temperature_diff_centigrade = 30, boiler_efficiency = 0.9) {

    let litres = shower_get_daily_litres(num_showers, shower_length_minutes, shower_flow_litres_per_second)

    let joules = (litres * water_specific_heat_capacity * temperature_diff_centigrade) / boiler_efficiency

    return convert.per("kwh/j") * joules

}
function bath_get_daily_kwh(baths_per_day, litres_per_bath, temperature_diff_centigrade = 30, boiler_efficiency = 0.9) {

    let joules = (litres_per_bath * baths_per_day * water_specific_heat_capacity * temperature_diff_centigrade) / boiler_efficiency
    return convert.per("kwh/j") * joules

}

export let shower_bath = {
    'shower_get_daily_litres': shower_get_daily_litres,
    'shower_get_daily_kwh': shower_get_daily_kwh,
    'bath_get_daily_kwh': bath_get_daily_kwh
};