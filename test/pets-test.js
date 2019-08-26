var tape = require("tape")
var eu = require("../")

tape("test driving", function (test) {

    test.equal(eu.driving._miles_driven_to_gallons_of_fuel_per_day(30, "days", 30), 1);
    test.equal(eu.driving._miles_driven_to_gallons_of_fuel_per_day(30, "weeks", 30), 1 / 7);

    // https://en.wikipedia.org/wiki/Energy_efficiency_in_transport
    let actual = eu.driving.miles_driven_to_kwh_per_day(1, "days", 30) // 30 mpg

    let lower = (1 / 74.31) * eu.convert.per("kwh/imperial_gallons_petrol")  // Worse than 74.31 mpg Seat Ibize
    let upper = (1 / 13.8) * eu.convert.per("kwh/imperial_gallons_petrol")   // Better than 13.8 mpg Cadillac CTS-V

    test.between(actual, lower, upper)
    test.end();
});