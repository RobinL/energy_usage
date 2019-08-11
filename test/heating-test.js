var tape = require("tape")
var eu = require("../")

tape("test heating", function (test) {

    test.equal(eu.heating._get_thermostat_adjustment(19,19), 1)

    test.end();
});