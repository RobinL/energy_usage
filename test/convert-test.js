var tape = require("tape")
var eu = require("../")

tape("test convert", function (test) {

    // Conversion from flow and length to number of litres
    test.equal(eu.convert.convert_units("hours", "seconds"), 60*60);
    test.equal(eu.convert.convert_units("seconds", "hours"), 1/(60 * 60));
    test.equal(eu.convert.per("seconds/hours"), 60*60)

    test.end();
});