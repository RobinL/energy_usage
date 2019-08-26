var tape = require("tape")
var eu = require("../")

tape("test eating", function (test) {

    // From Wikipedia: "a 55 year-old woman weighing 130 lb (59 kg) and 5 feet 6 inches (168 cm) tall... has a BMR of 1204 kcal per day"

    let cal = eu.eating._get_BMR(59, 168,55, "female")
    test.equal(cal, 1204)

    let est_kwh = eu.eating.kwh_per_day(70, 200, 40, "male", "moderately_active")
    // To get rough idea of whether this is right, assume every cal eaten requires 10 cal of energy (upper bound)
    // and person consumes 4500 cal a day

    // To get rough idea of whether this is right, assume every cal eaten requires 3 cal of energy (upper bound)
    //and person consumes 1500 cal a day

    let upper = eu.utils.joules_to_kwh(4500 * 10 * eu.utils.JOULES_PER_KCAL)
    let lower = eu.utils.joules_to_kwh(1500 * 3 * eu.utils.JOULES_PER_KCAL)

    test.between(est_kwh, lower, upper)


    test.end();
});