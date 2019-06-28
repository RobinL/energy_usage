var tape = require("tape")
var eu = require("../")

tape("test flying", function (test) {

    // https://en.wikipedia.org/wiki/Energy_efficiency_in_transport
    let lower = eu.flying.flying_miles_to_kwh(1, "days") > 0.1864 * eu.utils.KM_PER_MILE  // Worse than 143 mpg nissan leaf
    let upper = eu.flying.flying_miles_to_kwh(1, "days") < 0.3986 * eu.utils.KM_PER_MILE  // Better than 67 mpg prius

    test.true((lower & upper))
    test.end();
});