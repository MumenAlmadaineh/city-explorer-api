"use strict";

const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');
app.use(cors());
require('dotenv').config();
const weatherInfo = require('./data/weather.json');
const PORT = process.env.PORT;

app.listen(PORT, () => {
})

let getWeather = async (req, res) => {
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

class ForeCast {
    constructor(date, description) {
        this.date = date;
        this.description = description;
    }
}

app.get('/weather', getWeather)

app.get('/', (req, res) => {
    res.send('Home Route')
})


let getMoveInfo = async (req, res) => {
    let searchQuery = req.query.searchQuery;
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchQuery}`;
    let response = await axios.get(url);
    let movieInfo = response.data;

    console.log(movieInfo);

    let cleanedMoveInfo = movieInfo.results.map(item => {
        return new MoveForeCast(item.title, item.overview, item.vote_average, item.vote_count, item.poster_path, item.popularity, item.release_date);
    })
    res.status(200).json(cleanedMoveInfo);
}


class MoveForeCast {
    constructor(title, overview, vote_average, vote_count, poster_path, popularity, release_date) {
        this.title = title;
        this.overview = overview;
        this.vote_average = vote_average;
        this.vote_count = vote_count;
        this.poster_path = poster_path;
        this.popularity = popularity;
        this.release_date = release_date;
    }

}

app.get('/movies', getMoveInfo)