function joules_to_kwh(joules) {
    return joules /(60*60*1000)
}

export let utils = {
    'joules_to_kwh': joules_to_kwh
};