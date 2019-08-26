function format_kwh(kwh_float) {
    return kwh_float.toPrecision(2)
}

export let utils = {
    'format_kwh' : format_kwh
};

