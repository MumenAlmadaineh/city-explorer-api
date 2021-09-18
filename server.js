"use strict";

const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');
app.use(cors());
require('dotenv').config();
const weatherInfo = require('./data/weather.json');
const weather = require('./controllers/weather');
const movies = require('./controllers/movies');


const PORT = process.env.PORT;
app.listen(PORT, () => {
})
app.get('/', (req, res) => {
    res.send('Home Route')
})
app.get('/weather', weather)
app.get('/movies', movies)