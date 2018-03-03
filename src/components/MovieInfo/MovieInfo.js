import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./MovieInfo.css";

export default class MovieInfo extends Component {
    constructor(props){
        super(props);

        this.state= {
            movie: {},
            genres: []
        }
    }

    // CDM makes a call to API to request specific movie info.
    componentDidMount(){
        axios.get(`/api/details/${this.props.match.params.id}`)
            .then(response=> {
                this.setState({ movie: response.data, genres: response.data.genres });
                console.log(response.data);
            });
    }

    render(){
        const backdropURL= `http://image.tmdb.org/t/p/w1280${this.state.movie.backdrop_path}`;
        const genres= this.state.genres.map((genre, i)=> {
            return(
                <p key={i}>{ genre.name } 
                {i<this.state.genres.length-1 && (
                    <span> | </span>
                  )
                }</p> 
            )
        });

        return(
            <div className="movie-info-view">
                <div className="backdrop-container">
                    <img className="movie-backdrop" src={backdropURL} />
                </div>

                <div className="movie-info-container">
                    <h1>{ this.state.movie.title } <span style={{ color:"grey" }}>({ this.state.movie.release_date })</span></h1>
                    <p>{ this.state.movie.tagline }</p>
                    <p>{ `Rating: ${ this.state.movie.vote_average }/10` }</p>
                    <p>{ `Runtime: ${ this.state.movie.runtime } minutes` }</p>

                    <div className="genres-container">
                        GENRES: { genres }
                    </div>

                    <p>{ this.state.movie.overview }</p>
                </div>

                <Link to="/">
                    <p> Back to Home </p>
                </Link>
            </div>
        )
    }
}