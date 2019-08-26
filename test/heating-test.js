var tape = require("tape")
var eu = require("../")
require("./helpers")

tape("test heating", function (test) {

    test.equal(eu.heating._get_thermostat_adjustment(19,19), 1)

    // Back of the envelope calculation:  if uk average temp is around 10 degrees, then on average
    // going from 19 to 20 degrees means heating requirement goes from 9 to 10 degree uplift in temperature
    // i.e. a 1/9 = 11% increase
    test.between(eu.heating._get_thermostat_adjustment(19, 20), 1.05, 1.15)

    test.between(eu.heating._get_thermostat_adjustment(20, 0), 0, 0.1)

    test.bet

    test.end();
});