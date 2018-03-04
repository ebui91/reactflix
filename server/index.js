require("dotenv").config();
const express= require("express");
const { json }= require("body-parser");
const cors= require("cors");
const axios= require("axios");

// Initializing Server
const app= express();
const port= process.env.PORT || 3001;


// Middlewares
app.use(json());
app.use(cors());


// Endpoints
app.get("/api/movies", (req, res, next)=> {
    axios.get(`${process.env.API_URL}?api_key=${process.env.API_KEY}`)
        .then(response=> res.status(200).json(response.data.results))
        .catch(console.log);
});

app.get("/api/details/:id", (req, res, next)=> {
    axios.get(`${process.env.DETAILS_URL}/${req.params.id}?api_key=${process.env.API_KEY}&language=en-US`)
        .then(response=> res.status(200).json(response.data))
        .catch(console.log);
});

app.get("/api/filter", (req, res, next)=> {
    console.log(req.query);
    console.log(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}`
    + `&language=en-US&sort_by=popularity.desc`
    + `&with_genres=${req.query.genre}`
    + `&primary_release_date.gte=${req.query.yearMin}-01-01&primary_release_date.lte=${req.query.yearMax}-12-31`
    + `&vote_average.gte=${req.query.ratingMin}`
    + `&vote_average.lte=${req.query.ratingMax}`
    + `&with_runtime.gte=${req.query.runtimeMin}`
    + `&with_runtime.lte=${req.query.runtimeMax}`)

    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}`
        + `&language=en-US&sort_by=popularity.desc`
        + `&with_genres=${req.query.genre}`
        + `&primary_release_date.gte=${req.query.yearMin}-01-01&primary_release_date.lte=${req.query.yearMax}-12-31`
        + `&vote_average.gte=${req.query.ratingMin}`
        + `&vote_average.lte=${req.query.ratingMax}`
        + `&with_runtime.gte=${req.query.runtimeMin}`
        + `&with_runtime.lte=${req.query.runtimeMax}`)
        .then(response=> res.status(200).json(response.data))
        .catch(console.log);
});


// Server Listening
app.listen(port, ()=> {
    console.log(`Server is live on port: ${port}.`);
});



// GET GENRES
// https://api.themoviedb.org/3/genre/movie/list?api_key=<<api_key>>&language=en-US

// FULL API URL FORMAT
// const moviesUrl = `https://api.themoviedb.org/3/discover/movie?` +
// `api_key=651925d45022d1ae658063b443c99784&` +
// `language=en-US&sort_by=popularity.desc&` +
// `with_genres=${genreId}&` +
// `primary_release_date.gte=${year.value.min}-01-01&` +
// `primary_release_date.lte=${year.value.max}-12-31&` +
// `vote_average.gte=${rating.value.min}&` +
// `vote_average.lte=${rating.value.max}&` +
// `with_runtime.gte=${runtime.value.min}&` +
// `with_runtime.lte=${runtime.value.max}&` +
// `page=${page}`;