function joules_to_kwh(joules) {
    return joules /(60*60*1000)
}

function convert_time_period(value, from="years", to="days") {

    let multipliers = {
        "minutes": 1 /(60*24),
        "hours": 1/24,
        "days": 1,
        "weeks": 7,
        "months": 365/30,
        "years": 365
    }

    let numerator = multipliers[from]
    let denominator = multipliers[to]

    return value * (numerator / denominator)

}

export let utils = {
    'joules_to_kwh': joules_to_kwh,
    'convert_time_period': convert_time_period
};