var tape = require("tape")
var eu = require("../")

tape("test shower", function (test) {

    // Conversion from flow and length to number of litres
    test.equal(eu.shower.get_daily_litres(2,1,10), 1.2);

    test.equal(eu.shower.get_daily_litres(1, 1, 1000/60), 1);

    //1 litre of shower per day
    test.floating_equalish(eu.shower.get_daily_kwh(1, 1, 1000 / 60, 1, 1), 4184/3600000);

    //2.3 kwh seems reasonable for 60 litres
    //console.log(eu.shower.get_daily_kwh(1, 10, 100, 30, 0.9));

    test.end();
});