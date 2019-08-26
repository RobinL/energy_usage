var tape = require("tape")
var eu = require("../")
require("./helpers")

tape("test heating", function (test) {

    test.equal(eu.heating._get_thermostat_adjustment(19,19), 1)

    test.between(eu.heating._get_thermostat_adjustment(19, 20), 1, 1.2)

    test.between(eu.heating._get_thermostat_adjustment(20, 0), 0, 0.1)

    test.bet

    test.end();
});