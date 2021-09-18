"use strict";
const axios = require('axios');
const MoveForeCast = require ('../model/movies')

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

module.exports = getMoveInfo;