var tape = require("tape")
var eu = require("../")
require("./helpers")

tape("test heating", function (test) {

    test.equal(eu.heating._get_thermostat_adjustment(19,19), 1)

    // Back of the envelope calculation:  if uk average temp is around 10 degrees, then on average
    // going from 19 to 20 degrees means heating requirement goes from 9 to 10 degree uplift in temperature
    // i.e. a 1/9 = 11% increase.  Actually you'd expect it to be a bit higher than this since
    // heating loss increaess with delta temp
    test.between(eu.heating._get_thermostat_adjustment(19, 20), 1.1, 1.15)

    test.between(eu.heating._get_thermostat_adjustment(20, 0), 0, 0.1)

    let heating_1kw_a_day_per_year = eu.convert.convert_units("years", "days")
    let daily = eu.heating.heating_kwh_per_day(heating_1kw_a_day_per_year,20,20,1,"kwh")
    test.floating_equalish(daily, 0.8)

    test.end();
});