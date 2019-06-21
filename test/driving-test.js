var tape = require("tape")
var eu = require("../")

tape("test driving", function (test) {


    test.equal(eu.driving._miles_driven_to_gallons_of_fuel_per_day(30, "days", 30), 1);
    test.equal(eu.driving._miles_driven_to_gallons_of_fuel_per_day(30, "weeks", 30), 1/7);

    // https://en.wikipedia.org/wiki/Energy_efficiency_in_transport
    let lower = eu.driving.miles_driven_to_kwh_per_day(1, "days") > 0.36 * eu.utils.KM_PER_MILE  // Worse than 74.31 mpg Seat Ibize
    let upper = eu.driving.miles_driven_to_kwh_per_day(1, "days") < 1.6 * eu.utils.KM_PER_MILE  // Better than 13.8 mpg Cadillac CTS-V

    test.true((lower & upper))
    test.end();
});