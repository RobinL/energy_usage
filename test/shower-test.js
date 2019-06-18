var tape = require("tape"),  eu = require("../")

tape("test shower", function (test) {

    test.equal(eu.get_daily_litres(1,2,3), 0.36);
    test.end();
});