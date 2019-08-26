var tape = require("tape")
var eu = require("../")

tape("test stuff", function (test) {

    // Stuff shouldn't have a greater impact than buying oil!
    let kwh_per_litre = eu.convert.convert_units("litres_petrol","kwh")

    let kwh_per_pound_sterling_petrol = kwh_per_litre / (1.20 - 0.58)   // petrol costs around £1.20 minus 58p fuel duty

    let actual = eu.stuff._get_average_kwh_per_pound_sterling()

    let upper = kwh_per_pound_sterling_petrol
    let lower = (kwh_per_pound_sterling_petrol / 10)

    test.between(actual, lower , upper)

    test.end();
});

