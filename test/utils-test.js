var tape = require("tape")
var eu = require("../")

tape("test utils", function (test) {

    // Conversion from flow and length to number of litres


    test.equal(eu.utils.joules_to_kwh(3600000), 1);


    test.end();
});