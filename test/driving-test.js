var tape = require("tape")
var eu = require("../")

tape("test driving", function (test) {


    console.log(eu.driving.miles_driven_per_year_to_kwh_per_day(365.25, 45))
    // test.equal(eu.driving.miles_driven_per_year_to_kwh_per_day(365.25, 30), );


    test.end();
});