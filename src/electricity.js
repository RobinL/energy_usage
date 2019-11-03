import { convert } from './convert.js'


function electricity_kwh_per_day(kwh_per_year, num_in_household) {

    let kwh_per_day = kwh_per_year * convert.per("years/days")

    kwh_per_day = kwh_per_day / num_in_household

    return kwh_per_day

}

export let electricity = {
    'electricity_kwh_per_day': electricity_kwh_per_day
};