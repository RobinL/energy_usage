var tape = require("tape")
var eu = require("../")

tape("test convert", function (test) {

    // Test an inverted conversion
    test.equal(eu.convert.convert_units("meters", "kilometers"), 1/1000);

    // Test a 'chained' conversion and in reverse
    test.equal(eu.convert.convert_units("hours", "seconds"), 60*60);
    test.equal(eu.convert.convert_units("seconds", "hours"), 1/(60 * 60));

    // Test a abbreviation
    test.equal(eu.convert.convert_units("km", "meters"), 1000);

    test.end();
});