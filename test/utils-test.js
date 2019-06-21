var tape = require("tape")
var eu = require("../")

tape("test utils", function (test) {

    // Conversion from flow and length to number of litres
    test.equal(eu.utils.joules_to_kwh(3600000), 1);

    test.equal(eu.utils.convert_time_period(1, "days", "weeks"), 7);
    test.equal(eu.utils.convert_time_period(1, "weeks", "days"), 1/7);
    test.equal(eu.utils.convert_time_period(365, "years", "days"), 1);


    test.end();
});