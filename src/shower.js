import { convert } from './convert.js'

function get_daily_litres(num_showers, shower_length_minutes, shower_flow_millilitres_per_second) {
    return num_showers * shower_length_minutes * shower_flow_millilitres_per_second * (60/1000);
}

function get_daily_kwh(num_showers, shower_length_minutes, shower_flow_litres_per_second, temperature_diff_centigrade = 30, boiler_efficiency = 0.9) {

    // ///'The specific heat capacity of water is aaround 4,200 Joules per kilogram per degree Celsius (J/kg°C).'

    const water_specific_heat_capacity = 4184
    let litres = get_daily_litres(num_showers, shower_length_minutes, shower_flow_litres_per_second)

    let joules = (litres * water_specific_heat_capacity * temperature_diff_centigrade) / boiler_efficiency

    return convert.per("kwh/j") * joules

}

export let shower = {
    'get_daily_litres': get_daily_litres,
    'get_daily_kwh': get_daily_kwh
};