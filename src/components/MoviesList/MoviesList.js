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
                max: 2017,
                step: 1,
                value: { min: 2000, max: 2017 }
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
                max: 300,
                step: 15,
                value: { min: 60, max: 120 }
            }
        }
        this.onChange= this.onChange.bind(this);
    }

    // CDM API call to generate movies
    componentDidMount(){
        axios.get("/api/movies").then(movies=> {
            console.log(movies.data);
            this.setState({ movieList: movies.data });
        });
    }

    onChange = data => {
        this.setState({
          [data.type]: {
            ...this.state[data.type],
            value: data.value
          }
        });
    };

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
            <div className="moviesList-view">
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

                <div className="movies-container">
                    { movies }
                </div>
            </div>
        )
    }
}