var tape = require("tape")
var eu = require("../")

tape("test pets", function (test) {

    // This is a little difficult to test but we can sense check it
    // (1) against our figures for eating and
    // (2) against our figures for buying stuff

    // Expect of a 60kg dog to have similar
    // energy requirements to a 60kg human omnivore

    let actual = eu.pets.kwh_required_by_dogs_per_day(60)

    let human_eq = eu.eating.kwh_per_day(60, 165, 30, "male", 'moderately_active','omnivore')

    let lower = human_eq * 0.75
    let upper = human_eq * 1.5

    test.between(actual, lower, upper)

    // How about if you count dog food as 'stuff'
    actual = eu.pets.kwh_required_by_dogs_per_day(15)
    let stuff_eq = eu.stuff.pounds_sterling_to_kwh(400) * eu.convert.per("years/days") //£400 a year https://www.moneyadviceservice.org.uk/blog/how-much-does-it-cost-to-keep-a-dog

    // console.log(actual/stuff_eq) -> 4.18
    // This suggests the energy embodied in food is much higher than consumer goods, which is a bit suspect.

    test.between(actual, stuff_eq * 0.2, stuff_eq * 5)

    test.end();
});