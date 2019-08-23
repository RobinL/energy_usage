var tape = require("tape")
var eu = require("../")
require("./helpers")

tape("test heating", function (test) {

    test.equal(eu.heating._get_thermostat_adjustment(19,19), 1)

    test.equal_with_perc_tolerance(1.1, 1, 0.05)

    test.end();
});