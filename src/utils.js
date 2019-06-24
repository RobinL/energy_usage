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

    if (!(from in multipliers)) {
        throw "from timeperiod must be in " + Object.keys(multipliers).toString() + ", you passed " + from
    }

    if (!(to in multipliers)) {
        throw "to timeperiod must be in " + Object.keys(multipliers).toString() + ", you passed " + to
    }

    let numerator = multipliers[to]
    let denominator = multipliers[from]

    return value * (numerator / denominator)

}

export let utils = {
    'joules_to_kwh': joules_to_kwh,
    'convert_time_period': convert_time_period,
    'KM_PER_MILE': 1.60934 //From Google

};