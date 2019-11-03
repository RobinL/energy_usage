var tape = require("tape")
var eu = require("../")

tape("test total", function (test) {

    // Total up an estimate of energy consumption of a fairly normal person

    let kwh = []

    // Driving 5000 miles a year at 30 mpg
    kwh.push(eu.driving.miles_driven_to_kwh_per_day(5000, "years", 30))

    // Our person is a 40 year old 70kg male
    kwh.push(eu.eating.kwh_per_day(70, 200, 40, "male", "moderately_active"))

    // Our person flys 6000 miles a year
    kwh.push(eu.flying.flying_miles_to_kwh(6000, "years"))

    // They have one 15kg dog
    kwh.push(eu.pets.kwh_required_by_dogs_per_day(15))

    // They use 12,000kwh of gas in a household of 2 https://www.ofgem.gov.uk/gas/retail-market/monitoring-data-and-statistics/typical-domestic-consumption-values
    kwh.push(eu.heating.heating_kwh_per_day(12000, 20, 20, 2, "kwh"))

    // They take a 5 minute shower a day
    kwh.push(eu.shower_bath.shower_get_daily_kwh(1,5,0.1))

    // They spend £600 a month on stuff like electronics, car repayments etc. https://www.ons.gov.uk/peoplepopulationandcommunity/personalandhouseholdfinances/incomeandwealth/bulletins/householddisposableincomeandinequality/financialyearending2019provisional
    kwh.push(eu.stuff.pounds_sterling_to_kwh(600) * eu.convert.per("months/days")   )

    // Run their washing machine and dishwasher a couple times a week
    kwh.push(eu.washing.washing_machine_kwh_per_day(2, "weeks", 30))
    kwh.push(eu.washing.dishwasher_kwh_per_day(2,"weeks",50))


    let daily_kwh_total = kwh.reduce((a, b) => a + b, 0)

    // Uplift energy usage by a bit to reflect government spending (less social protection etc).  This is extremely arbitrary!
    // Gvt spending is may 34%.  Let's say that 25% is non transfer payments
    daily_kwh_total = daily_kwh_total / (1-0.25)


    // What's the estimated energy usage of the uk per capita - from world bank WDI
    let daily_kwh_per_capita =  88.5

    // Note the above won't acount for 'imported' energy consumption see https://www.withouthotair.com/c15/page_93.shtml
    // Double it!
    daily_kwh_per_capita = daily_kwh_per_capita * 2

    test.between(daily_kwh_total, daily_kwh_per_capita * 0.7, daily_kwh_per_capita * 1.3)


    test.end();
});