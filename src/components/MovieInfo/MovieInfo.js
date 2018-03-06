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

    // Makes a call to API to request movie details for the selected movie.
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
                <p style={{ margin: "5px" }} key={i}>{ genre.name } 
                {i<this.state.genres.length-1 && (
                    <span> | </span>
                  )
                }</p> 
            )
        });

        return(
            <section className="movie-info-view">
                <div className="movie-info-backdrop-container">
                    <img className="movie-backdrop" src={backdropURL} alt="movie-backdrop" />

                    <Link to="/">
                        <button className="btn back-btn">
                            <i className="fas fa-chevron-left"></i>
                            <i className="fas fa-chevron-left"></i>
                            &nbsp;BACK
                        </button>
                    </Link>
                </div>

                <div className="movie-info-container">
                    <div className="movie-info-row">
                            <h1 style={{ margin:"0px" }}>
                                { this.state.movie.title } 
                                <span style={{ color:"#888" }}> ({ this.state.movie.release_date }) </span>
                            </h1>

                            <p style={{ fontStyle:"italic", color:"#888" }}>"{ this.state.movie.tagline }"</p>
                            <p style={{ color:"#FEFEFE", margin:"0px" }}>Rating: <span style={{ color:"#888" }}>{ this.state.movie.vote_average }/10</span></p>
                            <p style={{ color:"#FEFEFE" }}>Runtime: <span style={{ color:"#888" }}>{ this.state.movie.runtime } minutes</span></p>
                    </div>

                   <div className="movie-info-row">
                        <div className="genre-list">{ genres }</div>
                    </div>

                    <div className="description-container">
                        <p style={{ color:"#888" }}>{ this.state.movie.overview }</p>
                    </div>
                </div>
            </section>
        )
    }
}