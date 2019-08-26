var tape = require("tape")
var eu = require("../")

tape("test washing dishwasher", function (test) {

    test.equal(eu.washing.washing_machine_kwh_per_day(1, "days", 30), 0.7);

    test.floating_equalish(eu.washing.washing_machine_kwh_per_day(7, "weeks", 30), 0.7)
    test.equal(eu.washing.dishwasher_kwh_per_day(1, "days", 50), 1.05);

    test.end();
});