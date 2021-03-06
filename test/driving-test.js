var tape = require("tape")
var eu = require("../")

tape("test driving", function (test) {

    test.equal(eu.driving._miles_driven_to_gallons_of_fuel_per_day(30, "days", 30), 1);
    test.equal(eu.driving._miles_driven_to_gallons_of_fuel_per_day(30, "weeks", 30), 1/7);

    // https://en.wikipedia.org/wiki/Energy_efficiency_in_transport
    let actual = eu.driving.miles_driven_to_kwh_per_day(1, "days", 30) // 30 mpg

    let lower = (36.11/100) * eu.convert.convert_units("miles", "km") // Worse than 74.31 mpg Seat Ibiza, quoted as 36.11 kwh/100km
    let upper = (161.67/100) * eu.convert.convert_units("miles", "km")   // Better than 13.8 mpg Cadillac CTS-V, quoted as  161.67 kwh/100km

    test.between(actual, lower, upper)
    test.end();
});