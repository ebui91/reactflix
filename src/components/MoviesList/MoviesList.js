import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import InfiniteScroll from 'react-infinite-scroll-component';
import Sliders from "../Sliders/Sliders.js";
import "./MoviesList.css";


export default class MoviesList extends Component{
    constructor(props){
        super(props);

        this.state= {
            movieList: [],
            page: 1,
            year: {
                label: "year",
                min: 1990,
                max: 2018,
                step: 1,
                value: { min: 2016, max: 2018 }
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
            selectedGenre: 28
        }
        this.onChange= this.onChange.bind(this);
        this.handleGenreChange= this.handleGenreChange.bind(this);
        this.nextPage= this.nextPage.bind(this);
        this.submitSearch= this.submitSearch.bind(this);
    }

    // API call to generate currently popular movies each time the component mounts.
    componentDidMount(){
        axios.get("/api/movies").then(movies=> {
            this.setState({ movieList: movies.data });
        });
    }

    componentWillUpdate(){
        console.log("RESULTS: ", this.state.movieList);
    }

    // Method to handle user input for Sliders.
    onChange(data){
        this.setState({ [data.type]: { ...this.state[data.type], value: data.value } });
    };

    // Method to handle user input for genre dropdown menu.
    handleGenreChange(input){
        this.setState({ selectedGenre: input })
    }

    nextPage(){
        setTimeout(() => {
            var page= this.state.page++;
            this.submitSearch(page);
        }, 1000);
    }

    // Sends a request to the server with user-inputted data.
    submitSearch(page){
        axios.get("/api/filter", {
            params: {
                genre: this.state.selectedGenre,
                yearMin: this.state.year.value.min,
                yearMax: this.state.year.value.max,
                ratingMin: this.state.rating.value.min,
                ratingMax: this.state.rating.value.max,
                runtimeMin: this.state.runtime.value.min,
                runtimeMax: this.state.runtime.value.max,
                page: page
            }
        }).then(movies=> {
            this.setState({ movieList: this.state.movieList.concat(movies.data) });
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
                            <div className="info-col">
                                <p>Release: </p>
                                <p>{ movie.release_date }</p>
                            </div>
                            
                            <div className="info-col">
                                <p>Rating: </p>
                                <p>{ movie.vote_average }/10</p>
                            </div>
                        </div>
                    </div>
                </Link>
            )
        });
        return(
            <section className="moviesList-view">
                <div className="filters-container">
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

                    <div className="genre-container">
                        <p style={{ fontFamily:"Montserrat", fontSize:"14px" }}>Genre</p>
                        <select className="genre-menu" value={ this.state.genre } onChange={ (e)=> this.handleGenreChange(e.target.value) }>
                            {
                                this.state.genres.map(genre=> (
                                    <option key={ genre.id } value={ genre.id }>{ genre.name }</option>
                                ))
                            }
                        </select>

                        <button onClick={ ()=> this.submitSearch() } className="btn submit-btn">FIND A MOVIE</button>
                    </div>

                    
                </div>
                
                <InfiniteScroll    
                    pullDownToRefreshContent={
                        <h3 style={{ textAlign: "center" }}>&#8595; Pull down to refresh</h3>
                    }
                    releaseToRefreshContent={
                        <h3 style={{ textAlign: "center" }}>&#8593; Release to refresh</h3>
                    }
                    refreshFunction={ this.refresh }
                    next={ ()=> this.nextPage() }
                    hasMore={true}
                    loader={
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 14 32 4" width="100vw" height="16" fill="#06D6A0" preserveAspectRatio="none">
                            <path opacity="0.8" transform="translate(0 0)" d="M2 14 V18 H6 V14z">
                                <animateTransform attributeName="transform" type="translate" values="0 0; 24 0; 0 0" dur="2s" begin="0" repeatCount="indefinite" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" calcMode="spline" />
                            </path>
                            <path opacity="0.5" transform="translate(0 0)" d="M0 14 V18 H8 V14z">
                                <animateTransform attributeName="transform" type="translate" values="0 0; 24 0; 0 0" dur="2s" begin="0.1s" repeatCount="indefinite" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" calcMode="spline" />
                            </path>
                            <path opacity="0.25" transform="translate(0 0)" d="M0 14 V18 H8 V14z">
                                <animateTransform attributeName="transform" type="translate" values="0 0; 24 0; 0 0" dur="2s" begin="0.2s" repeatCount="indefinite" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" calcMode="spline" />
                            </path>
                        </svg>
                    }
                    endMessage={
                        <p style={{textAlign: 'center'}}>
                            No more movies!
                        </p>
                    }>
                    <div className="movies-container">
                        { movies }
                    </div>     
                </InfiniteScroll>
            </section>
        )
    }
}