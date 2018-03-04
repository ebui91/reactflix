import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Sliders from "../Sliders/Sliders.js";
import "./MoviesList.css";


export default class MoviesList extends Component{
    constructor(props){
        super(props);

        this.state= {
            movieList: [],
            year: {
                label: "year",
                min: 1990,
                max: 2018,
                step: 1,
                value: { min: 2000, max: 2018 }
            },
            rating: {
                label: "rating",
                min: 0,
                max: 10,
                step: 1,
                value: { min: 8, max: 10 }
            },
            runtime: {
                label: "runtime",
                min: 0,
                max: 200,
                step: 15,
                value: { min: 60, max: 120 }
            },
            genres: [
                { id: 28, name: "Action" },
                { id: 12, name: "Adventure" },
                { id: 16, name: "Animation" },
                { id: 35, name: "Comedy" },
                { id: 80, name: "Crime" },
                { id: 99, name: "Documentary" },
                { id: 18, name: "Drama" },
                { id: 10751, name: "Family" },
                { id: 14, name: "Fantasy" },
                { id: 36, name: "History" },
                { id: 27, name: "Horror" },
                { id: 10402, name: "Music" },
                { id: 9648, name: "Mystery" },
                { id: 10749, name: "Romance" },
                { id: 878, name: "Science Fiction" },
                { id: 10770, name: "TV Movie" },
                { id: 53, name: "Thriller" },
                { id: 10752, name: "War" },
                { id: 37, name: "Western" }
            ],
            selectedGenre: { id: 28, name: "Action" }
        }
        this.onChange= this.onChange.bind(this);
        this.submitSearch= this.submitSearch.bind(this);
    }

    // CDM API call to generate movies
    componentDidMount(){
        axios.get("/api/movies").then(movies=> {
            this.setState({ movieList: movies.data });
        });
    }

    onChange(data){
        this.setState({ [data.type]: { ...this.state[data.type], value: data.value } });
    };

    handleGenreChange(input){
        console.log(input);
        this.setState({ selectedGenre: input })
    }

    submitSearch(){
        axios.get("/api/filter", {
            params: {
                genre: this.state.selectedGenre.id,
                yearMin: this.state.year.value.min,
                yearMax: this.state.year.value.max,
                ratingMin: this.state.rating.value.min,
                ratingMax: this.state.rating.value.max,
                runtimeMin: this.state.runtime.value.min,
                runtimeMax: this.state.runtime.value.max
            }
        }).then(movies=> {
            console.log(movies.data);
        });
    }

    render(){
        const imgURL= "http://image.tmdb.org/t/p/w342";
        const movies= this.state.movieList.map((movie, i)=> {
            return(
                <Link key={i} to={ `/movies/${movie.id}` } style={{ textDecoration: "none" }}>
                    <div className="movie-card">
                        <img src={ imgURL + movie.poster_path } alt='movie poster'></img>
                        <h3>{ movie.original_title }</h3>

                        <div className="movie-card-info">
                            <p>Release: { movie.release_date.substring(0,4) }</p>
                            <p>Rating: { movie.vote_average }/10</p>
                        </div>
                    </div>
                </Link>
            )
        });
        return(
            <section className="moviesList-view">
                <div className="filters-container">
                <select value={ this.state.genre } onClick={ (e)=> this.handleGenreChange(e.target.value) }>
                    {
                        this.state.genres.map(genre=> (
                            <option key={ genre.id } value={ genre.id }>{ genre.name }</option>
                        ))
                    }
                </select>

                    <div className="sliders-container">
                        <Sliders 
                            onChange={ this.onChange } 
                            data={ this.state.year } 
                        />

                        <Sliders 
                            onChange={ this.onChange } 
                            data={ this.state.rating } 
                        />

                        <Sliders 
                            onChange={ this.onChange } 
                            data={ this.state.runtime } 
                        />
                    </div>

                    <button onClick={ ()=> this.submitSearch() } className="btn submit-btn">FIND A MOVIE</button>
                </div>

                <hr />

                <div className="movies-container">
                    { movies }
                </div>
            </section>
        )
    }
}