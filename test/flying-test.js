var tape = require("tape")
var eu = require("../")

tape("test flying", function (test) {

    // https://en.wikipedia.org/wiki/Energy_efficiency_in_transport
    let actual = eu.flying.flying_miles_to_kwh(1, "days")
    let lower =  0.1864 * eu.convert.per("km/miles")  // Worse than 143 mpg nissan leaf
    let upper = 0.3986 * eu.convert.per("km/miles")  // Better than 67 mpg prius

    test.between(actual, lower, upper)
    test.end();
});