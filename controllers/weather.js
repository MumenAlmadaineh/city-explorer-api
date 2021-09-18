"use strict";
const axios = require('axios');

const ForeCast = require ('../model/weather')

const getWeather = async (req, res) => {
    let lat = Number(req.query.lat);
    let lon = Number(req.query.lon);

    let apiUrl = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`;
    let info = await axios.get(apiUrl);
    let weatherInfo = info.data
    let cleanedInfo = weatherInfo.data.map(item => {
        return new ForeCast(item.datetime, item.weather.description);
    })
    res.status(200).json(cleanedInfo);
}

module.exports = getWeather;