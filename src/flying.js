// https://en.wikipedia.org/wiki/Airbus_A320_family shows that A320 is one of the most popular passenger planes

// Note these calculations accord closely with https://gist.github.com/RobinL/2d253d1b5a4a27e563fd1ce811c1bb86#file-defra_conversion_factors_2019-csv-L3514
// Which gives 0.08233kg co2 per km.  This calculator gets 0.0657.
// See page 85 (search for 'circling') https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/829336/2019_Green-house-gas-reporting-methodology.pdf
import { convert } from './convert.js'

function flying_miles_to_kwh(miles_flown, time_period="days") {


    // let miles_per_day = utils.convert_time_period(miles_flown, time_period, "days")
    let miles_per_day = miles_flown  * convert.convert_units('days', time_period)

    // A320 is quoted as 2.61 L / 100 km here: https://en.wikipedia.org/wiki/Fuel_economy_in_aircraft
    let litres_per_mile = (2.61 / 100) * convert.per("km/miles")

    let litres = miles_per_day * litres_per_mile
    let uplift_factor = 1.08 // See page 85 (search for 'circling').  This uplift factor is to account for delays/circling etc https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/829336/2019_Green-house-gas-reporting-methodology.pdf
    return litres * convert.per("kwh/litres_jet_fuel") * uplift_factor

}

export let flying = {
    'flying_miles_to_kwh': flying_miles_to_kwh
};