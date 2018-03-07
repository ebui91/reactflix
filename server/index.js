require("dotenv").config();
const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");
const axios = require("axios");

// Initializing Server
const app = express();
const port = process.env.PORT || 3001;


// Middlewares
app.use(json());
app.use(cors());

// Express serves static files for production build.nano 
app.use( express.static( `${__dirname}/../build` ) );

// Endpoints
// Get Popular Movies.
app.get("/api/movies", (req, res, next) => {
    axios.get(`${process.env.API_URL}?api_key=${process.env.API_KEY}`)
        .then(response => res.status(200).json(response.data.results))
        .catch(console.log);
});

// Get movie details for specific movie.
app.get("/api/details/:id", (req, res, next) => {
    axios.get(`${process.env.DETAILS_URL}/${req.params.id}?api_key=${process.env.API_KEY}&language=en-US`)
        .then(response => res.status(200).json(response.data))
        .catch(console.log);
});

// Request movies based on certain parameters from front-end. 
app.get("/api/filter", (req, res, next) => {
    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}`
        + `&certification_country=US&sort_by=popularity.desc`
        + `&with_genres=${req.query.genre}`
        + `&primary_release_date.gte=${req.query.yearMin}-01-01&primary_release_date.lte=${req.query.yearMax}-12-31`
        + `&vote_average.gte=${req.query.ratingMin}`
        + `&vote_average.lte=${req.query.ratingMax}`
        + `&with_runtime.gte=${req.query.runtimeMin}`
        + `&with_runtime.lte=${req.query.runtimeMax}`
        + `&page=${req.query.page}`)
        .then(response => { res.status(200).json(response.data.results) })
        .catch(console.log);
});


// Endpoint for serving index.html file.
const path = require('path')
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
})


// Server Listening
app.listen(port, () => {
    console.log(`Server is live on port: ${port}.`);
});