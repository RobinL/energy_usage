function get_daily_litres(num_showers, shower_minutes, shower_flow) {
    return num_showers * shower_minutes * shower_flow * 60 / 1000;
}

module.exports  = {
    'get_daily_litres': get_daily_litres
};